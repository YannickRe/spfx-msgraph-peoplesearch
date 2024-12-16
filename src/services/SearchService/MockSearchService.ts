import { ISearchService } from "./ISearchService";
import * as peopleSearchResults from './MockSearchServiceResults.json';
import { PageCollection } from "../../models/PageCollection";
import { ExtendedUser } from "../../models/ExtendedUser";
import { IProfileImage } from "../../models/IProfileImage";

export class MockSearchService implements ISearchService {
    private _selectParameter: string[];
    private _filterParameter: string;
    private _orderByParameter: string;
    private _searchParameter: string;
    private _enableUmlautReplacement: boolean;
    private _pageSize: number;
  
    public get selectParameter(): string[] { return this._selectParameter; }
    public set selectParameter(value: string[]) { this._selectParameter = value; }
  
    public get filterParameter(): string { return this._filterParameter; }
    public set filterParameter(value: string) { this._filterParameter = value; }
  
    public get orderByParameter(): string { return this._orderByParameter; }
    public set orderByParameter(value: string) { this._orderByParameter = value; }

    public get searchParameter(): string { return this._searchParameter; }
    public set searchParameter(value: string) { this._searchParameter = value; }

    public get enableUmlautReplacement(): boolean { return this._enableUmlautReplacement; }
    public set enableUmlautReplacement(value: boolean) { this._enableUmlautReplacement = value; }

    public get pageSize(): number { return this._pageSize; }
    public set pageSize(value: number) { this._pageSize = value; }
    
    public async searchUsers(): Promise<PageCollection<ExtendedUser>> {
        const timeout = Math.floor(Math.random() * (1000)) + 1;
        
        const resultData: PageCollection<ExtendedUser> = this.getResultData("1");

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resultData);
            }, timeout);
        });
    }

    public async fetchPage(currentPage: string): Promise<PageCollection<ExtendedUser>> {
        const timeout = Math.floor(Math.random() * (1000)) + 1;
        
        const resultData: PageCollection<ExtendedUser> = this.getResultData(currentPage);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resultData);
            }, timeout);
        });
    }

    public async fetchProfilePictures(users: ExtendedUser[]): Promise<IProfileImage> {
        return {};
     }

    private getResultData(currentPage: string): PageCollection<ExtendedUser> {
        const resultData: PageCollection<ExtendedUser> = {
            "@odata.count": peopleSearchResults["@odata.count"],
            value: peopleSearchResults.value as ExtendedUser[]
        };
        let peopleResults = resultData.value;

        //TODO: Implement select
        //TODO: Implement filter
        //TODO: Implement orderBy

        //Pagination
        const totalPages = Math.ceil(resultData["@odata.count"] / this.pageSize);
        const currentPageNumber = parseInt(currentPage);
        const currentPageZeroBased = currentPageNumber-1;
        peopleResults = peopleResults.slice(currentPageZeroBased * this.pageSize, (currentPageZeroBased * this.pageSize) + this.pageSize);

        if (currentPageNumber < totalPages) {
            resultData["@odata.nextLink"] = (currentPageNumber + 1).toString();
        }

        resultData.value = peopleResults;

        return resultData;
    }
}