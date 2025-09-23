import { useQuery } from '@tanstack/react-query';

import { getCloudListApi } from '../api/api';

/**
 * 클라우드 테이블 데이터 패칭 훅
 */
export const useCloudTable = () => {
  const {
    data: cloudTableData,
    isLoading: isCloudTableLoading,
    error: cloudTableError,
  } = useQuery({
    queryKey: ['cloud-table'],
    queryFn: () => getCloudListApi(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    select: (data) => data.data,
  });

  return { cloudTableData, isCloudTableLoading, cloudTableError };
};
