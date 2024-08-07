import { useQuery } from '@tanstack/react-query';
import { PostDetailResponse } from '@/jose/components/chapter4/types/post';
import { Post } from '@/jose/components/chapter4/apis/post';
import queryKeys from '@/jose/components/chapter4/constants/queryKeys';
import { AxiosResponse } from 'axios';

export default function usePostDetailQuery(id: number) {
  return useQuery<AxiosResponse<PostDetailResponse>>({
    queryKey: [queryKeys.postList, id],
    queryFn: () => Post.Get.PostDetail(id),
  });
}
