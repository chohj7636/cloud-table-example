import { NextResponse } from 'next/server';

import type { Cloud } from '../types';
import { GetCloudTableResponse } from './type';

// 테스트용 목 데이터
const mockClouds: Cloud[] = [
  {
    id: '1',
    provider: 'AWS',
    name: 'Production AWS Account',
    cloudGroupName: ['production', 'web-services'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    scheduleScanEnabled: false,
    regionList: ['ap-northeast-2', 'us-east-1'],
    credentials: {
      accessKeyId: 'AKIA********18',
      secretAccessKey: 'jZd1********0n',
    },
    credentialType: 'ACCESS_KEY',
    eventSource: {
      cloudTrailName: 'production-cloudtrail',
    },
  },
  {
    id: '2',
    provider: 'AWS',
    name: 'Development AWS Account',
    cloudGroupName: ['development', 'testing'],
    eventProcessEnabled: false,
    userActivityEnabled: true,
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'DAY',
      hour: '2',
      minute: '0',
    },
    regionList: ['ap-northeast-2'],
    credentials: {
      accessKeyId: 'AKIA********99',
      secretAccessKey: 'xyz9********4m',
    },
    credentialType: 'ACCESS_KEY',
    eventSource: {
      cloudTrailName: 'dev-cloudtrail',
    },
  },
  {
    id: '3',
    provider: 'AWS',
    name: 'Staging Environment',
    cloudGroupName: ['staging'],
    eventProcessEnabled: true,
    userActivityEnabled: false,
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'WEEK',
      weekday: 'MON',
      hour: '3',
      minute: '30',
    },
    regionList: ['ap-northeast-2', 'us-west-2'],
    credentials: {
      accessKeyId: 'AKIA********56',
      secretAccessKey: 'abc2********7k',
    },
    credentialType: 'ACCESS_KEY',
  },
];

export async function GET() {
  try {
    // 실제 API 응답처럼 약간의 지연 추가
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log(
      '✅ GET /api/clouds 호출됨 - 총',
      mockClouds.length,
      '개의 클라우드 반환',
    );

    return NextResponse.json({
      success: true,
      data: mockClouds,
      count: mockClouds.length,
      timestamp: new Date().toISOString(),
    }) as GetCloudTableResponse;
  } catch (error) {
    console.error('❌ API 에러:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clouds',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    ) as GetCloudTableResponse;
  }
}
