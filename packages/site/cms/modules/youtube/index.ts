import { typeDefs, YouTubeVideo } from './type';
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
          return true;
        }

        return false;
      })
      .then(async (isInCache) => {
        // console.log('isInCache', isInCache, video.title);
        if (!isInCache) {
          console.log('Heey, GH API Call!!!');
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
            .then((data) => console.log(data));
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
          return parsedResponse.feed.entry.map((video, index) => {
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
  },
  Mutation: {},
};

const youtubeModule = {
  typeDefs,
  resolvers,
};

export default youtubeModule;
