import { typeDefs, YouTubeVideo } from './type';
import xmlParser from 'fast-xml-parser';
import { IS_PROD } from '../../infra/db/createConfig';

async function cacheVideos(videos: Array<YouTubeVideo>) {
  // const cacheResult = videos.map(async (video) => {

  //   console.log('result',result);

  //   return true;
  // });
  // console.log('oi:cacheVideos:after');

  const result = videos.map(async (video) => {
    const contribution = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(`
        mutation {
          createContribution(input: {
            lang: PT_BR,
            title: ${video.title},
            date: ${video.date},
            url: ${video.link},
            description: ${video.description},
          }) {
            _id
          }
        }
      `),
    });
    return contribution;
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
          return parsedResponse.feed.entry.map((video) => ({
            id: video['yt:videoId'],
            date: new Date(video.published).toISOString(),
            link: `https://youtu.be/${video['yt:videoId']}`,
            title: video.title,
            description: video['media:group']['media:description'].split(
              '\n'
            )[0],
            thumbnail: `http://i1.ytimg.com/vi/${video['yt:videoId']}/hqdefault.jpg`,
          }));
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
