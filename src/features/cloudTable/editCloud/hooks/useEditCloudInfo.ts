import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getCloudInfoApi } from '../api/api';
import { EditCloudInfoParams } from '../api/type';

export const useEditCloudInfo = (id: string, enabled: boolean = false) => {
  // dialog close
  const { closeCloudDialog } = useCloudDialog();

  // 클라우드 정보 조회 query
  const {
    data: cloudInfoData,
    isLoading: isCloudInfoLoading,
    error: cloudInfoError,
    refetch: fetchCloudInfo,
  } = useQuery({
    queryKey: ['editCloudInfo', id],
    queryFn: () => getCloudInfoApi({ id }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: enabled && !!id,
    select: (data) => data.data,
    gcTime: 10 * 60 * 1000,
  });

  // 클라우드 수정 query (가데이터이기 떄문에 query로 호출하지 않고 console.log로 출력)
  const { mutate: editCloudInfo, isPending: isEditCloudInfoPending } =
    useMutation({
      mutationFn: (data: EditCloudInfoParams) => {
        console.log('클라우드 수정 데이터 정보: ', data);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 500);
        });
      },
      onSuccess: () => {
        closeCloudDialog();
        toast.success('클라우드 수정 성공', {
          position: 'top-center',
          duration: 2000,
        });
      },
      onError: (error) => {
        toast.error('클라우드 수정 실패', {
          description: '잠시후 다시 시도해주세요.',
          position: 'top-center',
          duration: 2000,
        });
        console.log(error);
      },
    });

  return {
    cloudInfoData,
    isCloudInfoLoading,
    cloudInfoError,
    fetchCloudInfo,
    editCloudInfo,
    isEditCloudInfoPending,
  };
};
