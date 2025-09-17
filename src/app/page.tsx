import CloudTable from '@/components/CloudTable';

import { Cloud } from './api/types';

// 서버 사이드에서 클라우드 데이터 가져오기
async function getClouds(): Promise<Cloud[]> {
  try {
    const response = await fetch('http://localhost:3000/api/clouds', {
      cache: 'no-store', // 항상 최신 데이터 가져오기
    });

    if (!response.ok) {
      throw new Error('Failed to fetch clouds');
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching clouds:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

export default async function Home() {
  const cloudData = await getClouds();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <CloudTable data={cloudData} />
      </div>
    </div>
  );
}
