import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export interface ExtendedUser extends MicrosoftGraph.User {
    photoUrl?: string;
}