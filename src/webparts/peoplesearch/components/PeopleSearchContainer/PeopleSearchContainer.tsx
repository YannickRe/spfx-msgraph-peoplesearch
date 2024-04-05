import * as React from 'react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PeopleSearchWebPartStrings';
import styles from '../PeopleSearchWebPart.module.scss';

import { IPeopleSearchContainerProps } from './IPeopleSearchContainerProps';
import { IPeopleSearchContainerState } from './IPeopleSearchContainerState';

import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  IconButton,
  Overlay,
  ITheme,
} from '@fluentui/react';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { DisplayMode } from '@microsoft/sp-core-library';
import ResultsLayoutOption from '../../../../models/ResultsLayoutOption';
import { isEqual, isEmpty } from '@microsoft/sp-lodash-subset';
import ITemplateContext from '../../../../models/ITemplateContext';
import { PeopleSearchBox } from '../PeopleSearchBox';
import SearchParameterOption from '../../../../models/SearchParameterOption';
import { ExtendedUser } from '../../../../models/ExtendedUser';

export class PeopleSearchContainer extends React.Component<
  IPeopleSearchContainerProps,
  IPeopleSearchContainerState
> {
  constructor(props: IPeopleSearchContainerProps) {
    super(props);

    this.state = {
      results: [
        {
          value: [],
        },
      ],
      resultCount: 0,
      areResultsLoading: false,
      errorMessage: '',
      hasError: false,
      page: 1,
      searchParameter: '',
      isReset: false,
    };
  }

  public async componentDidMount(): Promise<void> {
    if (!this.props.hideResultsOnload) {
      await this._fetchPeopleSearchResults(1, true);
    }
  }

  /**
   *
   *
   * @param {IPeopleSearchContainerProps} prevProps
   * @param {IPeopleSearchContainerState} prevState
   * @memberof Directory
   */
  public async componentDidUpdate(
    prevProps: IPeopleSearchContainerProps,
    prevState: IPeopleSearchContainerState
  ): Promise<void> {
    if (!isEqual(this.props.searchService, prevProps.searchService)) {
      if (this.state.isReset && this.props.hideResultsOnload) {
        this.setState({
          isReset: false,
          results: [
            {
              value: [],
            },
          ],
        });
      } else {
        await this._fetchPeopleSearchResults(1, true);
      }
    } else if (!isEqual(this.props, prevProps)) {
      if (this.state.hasError) {
        this.setState({
          hasError: false,
        });
      } else {
        this.forceUpdate();
      }
    }
  }

  /**
   *
   *
   * @returns {React.ReactElement<IPeopleSearchContainerProps>}
   * @memberof Directory
   */
  public render(): React.ReactElement<IPeopleSearchContainerProps> {
    const areResultsLoading = this.state.areResultsLoading;
    const items = this.state.results[this.state.page - 1];
    const hasError = this.state.hasError;
    const errorMessage = this.state.errorMessage;

    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    let renderWebPartTitle: JSX.Element = null;
    let renderWebPartContent: JSX.Element = null;
    let renderOverlay: JSX.Element = null;
    let renderShimmerElements: JSX.Element = null;
    let renderSearchBox: JSX.Element = null;
    let renderPagination: JSX.Element = null;

    // Loading behavior
    if (areResultsLoading) {
      if (!isEmpty(items.value)) {
        renderOverlay = (
          <div>
            <Overlay
              isDarkThemed={false}
              theme={this.props.themeVariant as ITheme}
              className={styles.overlay}
            >
              <Spinner size={SpinnerSize.medium} />
            </Overlay>
          </div>
        );
      } else {
        let templateContext = {
          items: items,
          resultCount: this.state.resultCount,
          showPagination: this.props.showPagination,
          showResultsCount: this.props.showResultsCount,
          showBackground: this.props.showBackground,
          showBlank: this.props.showBlank && this.props.searchParameterOption !== SearchParameterOption.SearchBox,
          showLPC: this.props.showLPC,
          themeVariant: this.props.themeVariant,
          pageSize: this.props.searchService.pageSize,
          serviceScope: this.props.serviceScope,
        } as ITemplateContext;
        templateContext = {
          ...templateContext,
          ...this.props.templateParameters,
        };

        renderShimmerElements =
          this.props.templateService.getShimmerTemplateComponent(
            this.props.selectedLayout,
            templateContext
          );
      }
    }

    // WebPart title
    renderWebPartTitle = (
      <WebPartTitle
        displayMode={this.props.displayMode}
        title={this.props.webPartTitle}
        updateProperty={(value: string) => this.props.updateWebPartTitle(value)}
      />
    );

    // WebPart content
    if (
      isEmpty(items.value) &&
      this.props.showBlank &&
      this.props.selectedLayout !== ResultsLayoutOption.Debug &&
      this.props.searchParameterOption !== SearchParameterOption.SearchBox
    ) {
      if (this.props.displayMode === DisplayMode.Edit) {
        renderWebPartContent = (
          <MessageBar messageBarType={MessageBarType.info}>
            {strings.ShowBlankEditInfoMessage}
          </MessageBar>
        );
      } else {
        renderWebPartTitle = null;
      }
    } else {
      let templateContext = {
        items: items,
        resultCount: this.state.resultCount,
        showPagination: this.props.showPagination,
        showResultsCount: this.props.showResultsCount,
        showBlank:
          this.props.showBlank &&
          this.props.searchParameterOption !== SearchParameterOption.SearchBox,
        showLPC: this.props.showLPC,
        themeVariant: this.props.themeVariant,
        pageSize: this.props.searchService.pageSize,
        serviceScope: this.props.serviceScope,
      } as ITemplateContext;
      templateContext = {
        ...templateContext,
        ...this.props.templateParameters,
      };

      const renderSearchResultTemplate =
        this.props.templateService.getTemplateComponent(
          this.props.selectedLayout,
          templateContext
        );

      if (
        this.props.searchParameterOption === SearchParameterOption.SearchBox
      ) {
        renderSearchBox = (
          <PeopleSearchBox
            themeVariant={this.props.themeVariant}
            onSearch={async (searchQuery, isReset) => {
              this.setState({
                isReset: isReset,
              });
              await this.props.updateSearchParameter(searchQuery);
            }}
            searchInputValue={this.props.searchService.searchParameter}
          />
        );
      }

      if (this.props.showPagination) {
        let prevPageEl: JSX.Element = null;
        let nextPageEl: JSX.Element = null;

        if (this.hasPreviousPage()) {
          prevPageEl = (
            <IconButton
              onClick={async () =>
                await this._fetchPeopleSearchResults(this.state.page - 1)
              }
              iconProps={{ iconName: 'DoubleChevronLeft8' }}
            />
          );
        }

        if (this.hasNextPage()) {
          nextPageEl = (
            <IconButton
              onClick={async () =>
                await this._fetchPeopleSearchResults(this.state.page + 1)
              }
              iconProps={{ iconName: 'DoubleChevronRight8' }}
            />
          );
        }

        renderPagination = (
          <div className={styles.searchPagination}>
            {prevPageEl}
            {nextPageEl}
          </div>
        );
      }

      renderWebPartContent = (
        <React.Fragment>
          {renderOverlay}
          {renderSearchBox}
          {renderSearchResultTemplate}
          {renderPagination}
        </React.Fragment>
      );
    }

    // Error Message
    if (hasError) {
      renderWebPartContent = (
        <MessageBar messageBarType={MessageBarType.error}>
          {errorMessage}
        </MessageBar>
      );
    }

    return (
      <div style={{backgroundColor: this.props.showBackground ? 'transparent' : semanticColors.bodyBackground}}>
        <div className={styles.peopleSearchWebPart}>
          {renderWebPartTitle}
          {renderShimmerElements ? renderShimmerElements : renderWebPartContent}
        </div>
      </div>
    );
  }

  private hasPreviousPage(): boolean {
    return this.state.page > 1;
  }

  private hasNextPage(): boolean {
    return (
      this.state.results.length > this.state.page ||
      !isEmpty(
        this.state.results[this.state.results.length - 1]['@odata.nextLink']
      )
    );
  }

  private async _fetchPeopleSearchResults(
    page: number,
    reset: boolean = false
  ): Promise<void> {
    try {
      if (
        (page === 1 && reset) ||
        isEmpty(this.state.results) ||
        isEmpty(this.state.results[0]) ||
        isEmpty(this.state.results[0].value)
      ) {
        const localSearchParameter = this.props.searchService.searchParameter;
        this.setState({
          areResultsLoading: true,
          hasError: false,
          errorMessage: '',
          searchParameter: localSearchParameter,
        });

        const searchResults = await this.props.searchService.searchUsers(
          this.props.templateParameters
        );

        this.setState(
          (prevState) => {
            if (prevState.searchParameter === localSearchParameter) {
              return {
                results: [searchResults],
                resultCount: searchResults['@odata.count'],
                areResultsLoading: false,
                page: 1,
              };
            }
            return null;
          },
          () => this._fetchPeopleProfilePictures(1)
        );
      } else if (this.state.results.length === page - 1) {
        if (this.hasNextPage()) {
          this.setState({
            areResultsLoading: true,
            hasError: false,
            errorMessage: '',
          });
          const nextLink =
            this.state.results[this.state.results.length - 1][
              '@odata.nextLink'
            ];
          const searchResults = await this.props.searchService.fetchPage(
            nextLink
          );
          this.setState(
            (prevState) => ({
              results: [...prevState.results, searchResults],
              areResultsLoading: false,
              page: page,
            }),
            () => this._fetchPeopleProfilePictures(page)
          );
        }
      } else {
        this.setState({
          page: page,
        });
      }
    } catch (error) {
      this.setState({
        areResultsLoading: false,
        results: [
          {
            value: [],
          },
        ],
        resultCount: 0,
        hasError: true,
        errorMessage: error.message,
        page: 1,
      });
    }
  }

  private async _fetchPeopleProfilePictures(page: number): Promise<void> {
    const currentState = this.state.results;
    const items = currentState[page - 1];
    const usersWithoutPhotos = items.value.filter((i) => isEmpty(i.photoUrl));
    const usersWithoutPhotosBatch = this._chunk(usersWithoutPhotos, 20);

    for (let i = 0; i < usersWithoutPhotosBatch.length; i++) {
      let isUpdated = false;
      const pictures = await this.props.searchService.fetchProfilePictures(
        usersWithoutPhotosBatch[i]
      );
      const ids = Object.keys(pictures);

      items.value = items.value.map((u) => {
        if (ids.indexOf(u.id) !== -1) {
          u.photoUrl = pictures[u.id];
          isUpdated = true;
        }
        return u;
      });

      if (isUpdated) {
        this.setState((prevState) => {
          if (isEqual(prevState.results, currentState)) {
            prevState.results[page - 1] = items;

            return {
              results: prevState.results,
            };
          }
          return null;
        });
      }
    }
  }

  private _chunk(array: ExtendedUser[], size: number): ExtendedUser[][] {
    const chunked_arr: ExtendedUser[][] = [];
    let index = 0;
    while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  }
}
