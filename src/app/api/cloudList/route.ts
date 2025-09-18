import { NextResponse } from 'next/server';

import { CloudTable } from '@/features/cloudTable/cloudList/api/type';

// 테스트용 목 데이터
const mockClouds: CloudTable[] = [
  {
    id: '1',
    provider: 'AWS',
    name: 'Production AWS Account',
    cloudGroupName: ['production', 'web-services'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    regionList: ['ap-northeast-2', 'us-east-1'],
  },
  {
    id: '2',
    provider: 'AWS',
    name: 'Development AWS Account',
    cloudGroupName: ['development', 'testing'],
    eventProcessEnabled: false,
    userActivityEnabled: true,
    regionList: ['ap-northeast-2'],
  },
  {
    id: '3',
    provider: 'AWS',
    name: 'Staging Environment',
    cloudGroupName: ['staging'],
    eventProcessEnabled: true,
    userActivityEnabled: false,
    regionList: ['ap-northeast-2', 'us-west-2'],
  },
];

export async function GET() {
  try {
    // 실제 API 응답처럼 약간의 지연 추가
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: mockClouds,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clouds',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
