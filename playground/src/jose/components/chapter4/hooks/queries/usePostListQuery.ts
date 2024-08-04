import { useQuery } from '@tanstack/react-query';
import { PostListResponse } from '@/jose/components/chapter4/types/post';
import { Post } from '@/jose/components/chapter4/apis/post';
import queryKeys from '@/jose/components/chapter4/constants/queryKeys';
import { AxiosResponse } from 'axios';

export default function usePostListQuery() {
  return useQuery<AxiosResponse<PostListResponse>>({
    queryKey: [queryKeys.postList],
    queryFn: Post.Get.PostList,
  });
}
