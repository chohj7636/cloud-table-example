import { NextResponse } from 'next/server';

import { Cloud } from '../types';
import { GetCloudTableResponse } from './type';

// Mock 데이터
const mockCloudData: Cloud[] = [
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
  {
    id: '4',
    provider: 'AWS',
    name: 'Security Monitoring',
    cloudGroupName: ['security', 'monitoring'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    scheduleScanEnabled: false,
    regionList: ['global', 'us-east-1'],
    credentials: {
      accessKeyId: 'AKIA********77',
      secretAccessKey: 'def3********9p',
    },
    credentialType: 'ACCESS_KEY',
    eventSource: {
      cloudTrailName: 'security-audit-trail',
    },
  },
  {
    id: '5',
    provider: 'AWS',
    name: 'Analytics Workload',
    cloudGroupName: ['analytics', 'data'],
    eventProcessEnabled: false,
    userActivityEnabled: false,
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'MONTH',
      date: '1',
      hour: '0',
      minute: '0',
    },
    regionList: ['us-west-2', 'ap-southeast-1'],
    credentials: {
      accessKeyId: 'AKIA********33',
      secretAccessKey: 'ghi4********2q',
    },
    credentialType: 'ACCESS_KEY',
  },
];

// GET /api/clouds
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockCloudData,
      datetime: new Date().toISOString(),
    }) as GetCloudTableResponse;
  } catch (error) {
    console.error('Error fetching clouds:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch cloud data',
      },
      { status: 500 },
    );
  }
}
