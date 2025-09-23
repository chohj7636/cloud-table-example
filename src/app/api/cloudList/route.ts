import { NextResponse } from 'next/server';

import { CloudTable } from '@/features/cloudTable/cloudList/api/type';

// 테스트용 목 데이터
const mockClouds: CloudTable[] = [
  {
    id: '1',
    provider: 'AWS',
    name: 'Production AWS Account',
    cloudGroupName: ['production'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    regionList: ['global', 'ap-northeast-2', 'us-east-1', 'eu-west-1'],
  },
  {
    id: '2',
    provider: 'AWS',
    name: 'Development AWS Account',
    cloudGroupName: ['development', 'testing'],
    eventProcessEnabled: false,
    userActivityEnabled: true,
    regionList: ['global', 'ap-northeast-2'],
  },
  {
    id: '3',
    provider: 'AWS',
    name: 'Staging Environment',
    cloudGroupName: ['staging'],
    eventProcessEnabled: true,
    userActivityEnabled: false,
    regionList: ['global', 'ap-northeast-2', 'us-west-2'],
  },
  {
    id: '4',
    provider: 'AZURE',
    name: 'Azure Production Subscription',
    cloudGroupName: ['production'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    regionList: ['global', 'Korea Central', 'East US', 'West Europe'],
  },
  {
    id: '5',
    provider: 'AZURE',
    name: 'Azure Dev/Test Subscription',
    cloudGroupName: ['development'],
    eventProcessEnabled: false,
    userActivityEnabled: false,
    regionList: ['global', 'Korea Central'],
  },
  {
    id: '6',
    provider: 'GCP',
    name: 'GCP Production Project',
    cloudGroupName: ['production'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    regionList: ['global', 'asia-northeast3', 'us-central1'],
  },
  {
    id: '7',
    provider: 'GCP',
    name: 'GCP Analytics Project',
    cloudGroupName: ['analytics'],
    eventProcessEnabled: true,
    userActivityEnabled: false,
    regionList: ['global', 'asia-northeast3', 'us-west1', 'europe-west1'],
  },
  {
    id: '8',
    provider: 'AWS',
    name: 'AWS Security Account',
    cloudGroupName: ['security'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    regionList: ['global', 'us-east-1', 'ap-northeast-2'],
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
