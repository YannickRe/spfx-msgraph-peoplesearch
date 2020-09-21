export interface IGraphPhotoBatchResponse {
  id: string;
  status: number;
  body: string;
  headers: {
    'Content-Type': string;
  };
}