import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { PostCreateCloudInfoParams } from '../api/type';

export const useCreateCloud = () => {
  // dialog close
  const { closeCloudDialog } = useCloudDialog();

  // 클라우드 생성 query (딜레이 500ms)
  const { mutate: createCloudInfo, isPending: isCreateCloudInfoPending } =
    useMutation({
      mutationFn: (data: PostCreateCloudInfoParams) => {
        console.log('클라우드 생성 데이터 정보: ', data);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 500);
        });
      },
      onSuccess: () => {
        closeCloudDialog();
        toast.success('클라우드 생성 성공', {
          position: 'top-center',
          duration: 2000,
        });
      },
      onError: (error) => {
        toast.error('클라우드 생성 실패', {
          description: '잠시후 다시 시도해주세요.',
          position: 'top-center',
          duration: 2000,
        });
        console.log(error);
      },
    });

  return { createCloudInfo, isCreateCloudInfoPending };
};
