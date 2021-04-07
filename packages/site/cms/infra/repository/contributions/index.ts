import { RespositoryMethod } from '../types/Repository';
import {
  getContributionsPageData,
  ContributionsPageQuery,
} from './getContributionsPageData';

interface CMSContributionsRepository {
  getContributionsPageData: () => RespositoryMethod<ContributionsPageQuery>;
}

export const cmsContributionsRepository = (): CMSContributionsRepository => {
  return {
    getContributionsPageData,
  };
};
