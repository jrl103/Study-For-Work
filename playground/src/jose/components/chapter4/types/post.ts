/*******************  HTTP REQUESTS  *********************/

/*******************  HTTP RESPONSE  *********************/
export type PostListResponse = PostItem[];
export type PostDetailResponse = PostItem;

/*******************       DTO       *********************/
export interface PostItem {
  id: number;
  userId: number;
  title: string;
  body: string;
}
