import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IPeopleSearchBoxProps {
    onSearch: (searchQuery: string) => Promise<void>;
    themeVariant: IReadonlyTheme | undefined;
    searchInputValue: string;
}