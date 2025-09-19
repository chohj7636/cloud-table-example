'use client';

import { getCloudListApi } from '@/features/cloudTable/cloudList/api/api';
import { useQuery } from '@tanstack/react-query';

const CloudTableContainer = () => {
  // 데이터 패칭
  const { data, isLoading, error } = useQuery({
    queryKey: ['cloud-table'],
    queryFn: () => getCloudListApi(),
  });

  console.log(data);

  return (
    <div>
      <div>1</div>
    </div>
  );
};

export default CloudTableContainer;
