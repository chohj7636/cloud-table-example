import { getCloudListApi } from '@/features/cloudTable/cloudList/api/api';
import CloudTable from '@/features/cloudTable/cloudList/ui/CloudTable';

import { Cloud } from '../shared/types/types';

export default async function Home() {
  const cloudData = await getCloudListApi();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <CloudTable data={cloudData.data as Cloud[]} />
      </div>
    </div>
  );
}
