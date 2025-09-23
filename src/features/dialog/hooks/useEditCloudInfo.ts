import { useQuery } from '@tanstack/react-query';

import { getCloudInfoApi } from '../api/api';

export const useEditCloudInfo = (id: string, enabled: boolean = false) => {
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

  return { cloudInfoData, isCloudInfoLoading, cloudInfoError, fetchCloudInfo };
};
