import { DisplayMode, ServiceScope } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { ISearchService } from "../../../../services/SearchService";
import ResultsLayoutOption from "../../../../models/ResultsLayoutOption";
import { TemplateService, IComponentFieldsConfiguration } from "../../../../services/TemplateService/TemplateService";
import SearchParameterOption from "../../../../models/SearchParameterOption";

export interface IPeopleSearchContainerProps {
      /**
     * The web part title
     */
    webPartTitle: string;

    /**
     * The search data provider instance
     */
    searchService: ISearchService;

    searchParameterOption: SearchParameterOption;

    /**
     * Show the result count and entered keywords
     */
    showResultsCount: boolean;

    /**
     * Webpart has transparent background allowing section background to be visible
     */
    showBackground: boolean;

    /**
     * Show nothing if no result
     */
    showBlank: boolean;

    showPagination: boolean;

    showLPC: boolean;

    hideResultsOnload: boolean;
    /**
     * The current display mode of Web Part
     */
    displayMode: DisplayMode;

    /**
     * The current selected layout
     */
    selectedLayout: ResultsLayoutOption;

    /**
     * The current theme variant
     */
    themeVariant: IReadonlyTheme | undefined;

        /**
     * The template helper instance
     */
    templateService: TemplateService;

    /**
     * Template parameters from Web Part property pane
     */
    templateParameters: { [key:string]: IComponentFieldsConfiguration[] | number };

    serviceScope: ServiceScope;
    
    updateWebPartTitle: (value: string) => void;

    updateSearchParameter: (value: string) => Promise<void>;
}