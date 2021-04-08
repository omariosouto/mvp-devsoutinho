import { RespositoryMethod } from '../types/Repository';
import {
  getContributionsPageData,
  ContributionsPageQueryResult,
} from './getContributionsPageData';

interface CMSContributionsRepository {
  getContributionsPageData: () => RespositoryMethod<ContributionsPageQueryResult>;
}

export const cmsContributionsRepository = (): CMSContributionsRepository => ({
  getContributionsPageData,
});
