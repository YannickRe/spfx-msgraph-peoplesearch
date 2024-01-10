import { ExtendedUser } from '../../../../models/ExtendedUser';
import { PageCollection } from '../../../../models/PageCollection';

export interface IPeopleSearchContainerState {
  results: PageCollection<ExtendedUser>[];
  resultCount: number;
  areResultsLoading: boolean;
  errorMessage: string;
  hasError: boolean;
  page: number;
  searchParameter: string;
  isReset: boolean;
}
