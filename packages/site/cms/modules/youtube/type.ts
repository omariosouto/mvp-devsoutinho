import { gql } from 'apollo-server-micro';

export interface YouTubeVideo {
  id: string;
  date: string;
  title: string;
  link: string;
  description: string;
  thumbnail: string;
}

export type QueryYouTubeVideoInput = Pick<YouTubeVideo, 'id' | 'link'>;

export const typeDefs = gql`
  type YouTubeVideo {
    id: String
    date: String
    title: String
    link: String
    description: String
    thumbnail: String
  }

  input QueryYouTubeVideoInput {
    id: String
    link: String
  }

  extend type Query {
    youtubeVideos: [YouTubeVideo]!
    youtubeVideo(input: QueryYouTubeVideoInput): YouTubeVideo
  }
`;
