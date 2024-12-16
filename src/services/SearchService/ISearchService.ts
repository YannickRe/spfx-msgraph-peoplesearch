import { ExtendedUser } from '../../models/ExtendedUser';
import { IProfileImage } from '../../models/IProfileImage';
import { PageCollection } from '../../models/PageCollection';
import { IComponentFieldsConfiguration } from '../TemplateService/TemplateService';

export interface ISearchService {
    selectParameter: string[];
    filterParameter: string;
    orderByParameter: string;
    searchParameter: string;
    enableUmlautReplacement: boolean;
    pageSize: number;
    searchUsers(templateParameters: {
      [key: string]: IComponentFieldsConfiguration[] | number;
    }): Promise<PageCollection<ExtendedUser>>;
    fetchPage(pageLink: string): Promise<PageCollection<ExtendedUser>>;
    fetchProfilePictures(users: ExtendedUser[]): Promise<IProfileImage>;
}
