import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import { DynamicProperty } from '@microsoft/sp-component-base';
import SearchParameterOption from '../../models/SearchParameterOption';
import { IComponentFieldsConfiguration } from '../../services/TemplateService/TemplateService';

export interface IPeopleSearchWebPartProps {
  selectParameter: string;
  filterParameter: string;
  orderByParameter: string;
  searchParameter: DynamicProperty<string>;
  searchParameterOption: SearchParameterOption;
  pageSize: string;
  showPagination: boolean;
  showLPC: boolean;
  showResultsCount: boolean;
  showBackground: boolean;
  showBlank: boolean;
  hideResultsOnload: boolean;
  selectedLayout: ResultsLayoutOption;
  webPartTitle: string;
  templateParameters: {
    [key: string]: IComponentFieldsConfiguration[] | number;
  };
  enableUmlautReplacement: boolean;
}
