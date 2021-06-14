import { QueryYouTubeVideoInput, typeDefs, YouTubeVideo } from './type';
import xmlParser from 'fast-xml-parser';
import { IS_PROD } from '../../infra/db/createConfig';

async function cacheVideos(videos: Array<YouTubeVideo>) {
  const result = videos.map(async (video) => {
    const query = `mutation {
      createContribution(input: {
        lang: PT_BR,
        title: "${video.title}",
        date: "${video.date}",
        url: "${video.link}",
        description: "${video.description}",
      }) {
        _id
      }
    }`;
    const cacheResult = await fetch('http://localhost:3000/api/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then(async (response) => {
        const responseData = await response.json();
        const alreadyExists = responseData.errors;
        if (alreadyExists) {
          // eslint-disable-next-line no-console, prettier/prettier
          console.log('alreadyExists', video.title, JSON.stringify(responseData, null, 4));
          return true;
        }

        return false;
      })
      .then(async (isInCache) => {
        // console.log('isInCache', isInCache, video.title);
        if (!isInCache) {
          await fetch('https://github-stars-api.herokuapp.com/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: process.env.GH_STARS_TOKEN,
            },
            body: JSON.stringify({
              query: `
                mutation {
                  createContributions(data:
                    [{
                      title:"${video.title}"
                      url:"${video.link}"
                      description:"${video.description}"
                      type:VIDEO_PODCAST
                      date: "${video.date}"
                    }]
                    )
                    {
                      id
                    }
                }
              `,
            }),
          })
            .then((res) => res.text())
            // eslint-disable-next-line no-console
            .then((response) => console.log('GH_REGISTRY', response));
        }

        return isInCache;
      });

    return cacheResult;
  });
  await Promise.all(result);

  return true;
}

const YOUTUBE_CHANNEL_FEED_URL =
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCzR2u5RWXWjUh7CwLSvbitA';

const resolvers = {
  Query: {
    async youtubeVideos(): Promise<Array<YouTubeVideo>> {
      return fetch(YOUTUBE_CHANNEL_FEED_URL)
        .then(async (res) => {
          const response = await res.text();
          const parsedResponse = xmlParser.parse(response);
          return parsedResponse.feed.entry.map((video) => {
            const description = video['media:group']['media:description']
              .split('\n')[0]
              .replace(/\\\\o/g, '')
              .replace(/\\o/g, '');

            return {
              id: video['yt:videoId'],
              date: new Date(video.published).toISOString(),
              link: `https://youtu.be/${video['yt:videoId']}`,
              title: video.title,
              description,
              thumbnail: `http://i1.ytimg.com/vi/${video['yt:videoId']}/hqdefault.jpg`,
            };
          });
        })
        .then(async (videos) => {
          if (!IS_PROD) {
            await cacheVideos(videos);
          }
          return videos;
        });
    },
    async youtubeVideo(
      _: unknown,
      { input }: { input: QueryYouTubeVideoInput }
    ): Promise<YouTubeVideo> {
      const MATCH_YT_ID = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const videoId = input.link.match(MATCH_YT_ID)[7] || input.id;
      const API_KEY = process.env.YOUTUBE_GOOGLE_API_KEY;
      const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
      return fetch(YOUTUBE_API)
        .then((res) => res.json())
        .then((response) => {
          const video = response.items[0];
          const description = video.snippet.description
            .split('\n')[0]
            .replace(/\\\\o/g, '')
            .replace(/\\o/g, '');
          return {
            id: video.id,
            date: new Date(video.snippet.publishedAt).toISOString(),
            link: `https://youtu.be/${video.id}`,
            title: video.snippet.title,
            description,
            thumbnail: `http://i1.ytimg.com/vi/${video.id}/hqdefault.jpg`,
          };
        })
        .then(async (video) => {
          if (!IS_PROD) {
            await cacheVideos([video]);
          }
          return video;
        });
    },
  },
  Mutation: {},
};

const youtubeModule = {
  typeDefs,
  resolvers,
};

export default youtubeModule;
