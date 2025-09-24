import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { PostCreateCloudInfoParams } from '../api/type';

export const useCreateCloud = () => {
  // 클라우드 생성 query
  const { mutate: createCloudInfo } = useMutation({
    mutationFn: (data: PostCreateCloudInfoParams) => {
      console.log('클라우드 생성 데이터 정보: ', data);
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success('클라우드 생성 성공', {
        position: 'top-center',
        duration: 2000,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { createCloudInfo };
};
