declare interface IPeopleSearchWebPartStrings {
  DebugLayoutOption: string;
  FilterParameter: string;
  InvalidNumberIntervalMessage: string;
  NoResultMessage: string;
  OrderByParameter: string;
  PageSizeParameter: string;
  PeopleLayoutOption: string;
  PlaceHolderEditLabel: string;
  PlaceHolderConfigureBtnLabel: string;
  PlaceHolderIconText: string;
  PlaceHolderDescription: string;
  QuerySettingsGroupName: string;
  ResultsCount: string;
  ResultsLayoutLabel: string;
  SearchInputPlaceholder: string;
  SearchParameter: string;
  SearchParameterOption: string;
  NoneSearchParameterOption: string;
  StaticSearchParameterOption: string;
  BoxSearchParameterOption: string;
  DynamicSearchParameterOption: string;
  SearchQuerySettingsGroupName: string;
  SelectParameter: string;
  ShowPaginationControl: string;
  ShowLivePersonaCard: string;
  ShowResultsCountLabel: string;
  HideResultsOnloadLabel: string;
  ShowBlankLabel: string;
  ShowBlankEditInfoMessage: string;
  StylingSettingsGroupName: string;
  EnableUmlautReplacement: string;
  TemplateParameters: {
    TemplateParametersGroupName: string;
    ManagePeopleFieldsLabel: string;
    ManagePeopleFieldsPanelDescriptionLabel: string;
    PlaceholderNameFieldLabel: string;
    PlaceholderValueFieldLabel: string;
    PlaceholderSearchableFieldLabel: string;
    PersonaSizeOptionsLabel: string;
    PersonaSizeExtraSmall: string;
    PersonaSizeSmall: string;
    PersonaSizeRegular: string;
    PersonaSizeLarge: string;
    PersonaSizeExtraLarge: string;
  },
  ShowBackgroundLabel: string;
}

declare module 'PeopleSearchWebPartStrings' {
  const strings: IPeopleSearchWebPartStrings;
  export = strings;
}