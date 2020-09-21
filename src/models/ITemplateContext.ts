import { PageCollection } from './PageCollection';
import { IComponentFieldsConfiguration } from '../services/TemplateService/TemplateService';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { ExtendedUser } from './ExtendedUser';

interface ITemplateContext {
    items: PageCollection<ExtendedUser>;
    resultCount: number;
    showResultsCount: boolean;
    showBlank: boolean;
    showPagination: boolean;
    showLPC: boolean;
    peopleFields?: IComponentFieldsConfiguration[];
    themeVariant?: IReadonlyTheme;
    serviceScope: ServiceScope;
    [key:string]: any;
}

export default ITemplateContext;