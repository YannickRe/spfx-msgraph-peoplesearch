import { ISearchService } from "./ISearchService";
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { isEmpty } from "@microsoft/sp-lodash-subset";
import { PageCollection } from "../../models/PageCollection";
import { ExtendedUser } from "../../models/ExtendedUser";
import { IGraphBatchResponseBody } from "./IGraphBatchResponseBody";
import { IGraphBatchRequestBody } from "./IGraphBatchRequestBody";
import { IProfileImage } from "../../models/IProfileImage";

export class SearchService implements ISearchService {
  private _msGraphClientFactory: MSGraphClientFactory;
  private _selectParameter: string[];
  private _filterParameter: string;
  private _orderByParameter: string;
  private _searchParameter: string;
  private _pageSize: number;

  public get selectParameter(): string[] { return this._selectParameter; }
  public set selectParameter(value: string[]) { this._selectParameter = value; }

  public get filterParameter(): string { return this._filterParameter; }
  public set filterParameter(value: string) { this._filterParameter = value; }

  public get orderByParameter(): string { return this._orderByParameter; }
  public set orderByParameter(value: string) { this._orderByParameter = value; }

  public get searchParameter(): string { return this._searchParameter; }
  public set searchParameter(value: string) { this._searchParameter = value; }

  public get pageSize(): number { return this._pageSize; }
  public set pageSize(value: number) { this._pageSize = value; }

  constructor(msGraphClientFactory: MSGraphClientFactory) {
    this._msGraphClientFactory = msGraphClientFactory;
  }

  public async searchUsers(): Promise<PageCollection<ExtendedUser>> {
    const graphClient = await this._msGraphClientFactory.getClient('3');

    let resultQuery = graphClient
      .api('/users')
      .version("v1.0")
      .header("ConsistencyLevel", "eventual")
      .count(true)
      .top(this.pageSize);

    if (!isEmpty(this.selectParameter)) {
      resultQuery = resultQuery.select(this.selectParameter);
    }

    if (!isEmpty(this.filterParameter)) {
      resultQuery = resultQuery.filter(this.filterParameter);
    }

    if (!isEmpty(this.orderByParameter)) {
      resultQuery = resultQuery.orderby(this.orderByParameter);
    }

    if (!isEmpty(this.searchParameter)) {
      resultQuery = resultQuery.query({ $search: `"displayName:${this.searchParameter}"` });
    }

    return await resultQuery.get();
  }

  public async fetchPage(pageLink: string): Promise<PageCollection<ExtendedUser>>  {
    const graphClient = await this._msGraphClientFactory.getClient('3');

    const resultQuery = graphClient.api(pageLink).header("ConsistencyLevel", "eventual");

    return await resultQuery.get();
  }

  public async fetchProfilePictures(users: ExtendedUser[]): Promise<IProfileImage> {
    const graphClient = await this._msGraphClientFactory.getClient('3');

    const body: IGraphBatchRequestBody = { requests: [] };
        
    users.forEach((user) => {
      const requestUrl: string = `/users/${user.id}/photo/$value`;
      body.requests.push({ id: user.id.toString(), method: 'GET', url: requestUrl });
    });

    const response: IGraphBatchResponseBody = await graphClient.api('$batch').version('v1.0').post(body);

    const results: IProfileImage = {};
    response.responses.forEach(r => {
      if (r.status === 200) {
        results[r.id] = `data:${r.headers["Content-Type"]};base64,${r.body}`;
      }
    });

    return results;
  }
}
