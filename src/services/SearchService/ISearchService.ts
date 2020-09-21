import { ExtendedUser } from '../../models/ExtendedUser';
import { IProfileImage } from '../../models/IProfileImage';
import { PageCollection } from '../../models/PageCollection';

export interface ISearchService {
    selectParameter: string[];
    filterParameter: string;
    orderByParameter: string;
    searchParameter: string;
    pageSize: number;
    searchUsers(): Promise<PageCollection<ExtendedUser>>;
    fetchPage(pageLink: string): Promise<PageCollection<ExtendedUser>>;
    fetchProfilePictures(users: ExtendedUser[]): Promise<IProfileImage>;
}