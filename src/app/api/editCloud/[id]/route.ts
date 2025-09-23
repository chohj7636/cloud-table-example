import { NextResponse } from 'next/server';

import { GetCloudInfoParams } from '@/features/dialog/api/type';
import {
  AWSCredential,
  AWSEventSource,
  AzureCredential,
  AzureEventSource,
  Cloud,
  GCPCredential,
  GCPEventSource,
  ScheduleScanSetting,
} from '@/shared/types/types';

// Cloud 상세 정보 목업 데이터
const mockCloudDetails: Cloud[] = [
  {
    id: '1',
    name: 'Production AWS Account',
    provider: 'AWS',
    credentialType: 'ACCESS_KEY',
    credentials: {
      accessKeyId: 'AKIA********P18X',
      secretAccessKey: 'jZd1********0nQ2',
      roleArn: 'arn:aws:iam::123456789012:role/ProductionRole',
    } as AWSCredential,
    regionList: ['ap-northeast-2', 'us-east-1', 'eu-west-1'],
    proxyUrl: 'https://proxy.production.company.com:8080',
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'DAY',
      hour: '2',
      minute: '0',
    } as ScheduleScanSetting,
    eventSource: {
      cloudTrailName: 'production-cloudtrail',
    } as AWSEventSource,
    cloudGroupName: ['production'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
  },
  {
    id: '2',
    name: 'Development AWS Account',
    provider: 'AWS',
    credentialType: 'ACCESS_KEY',
    credentials: {
      accessKeyId: 'AKIA********D45F',
      secretAccessKey: 'xR8s********7kL9',
    } as AWSCredential,
    regionList: ['ap-northeast-2'],
    proxyUrl: '',
    scheduleScanEnabled: false,
    scheduleScanSetting: undefined,
    eventSource: {
      cloudTrailName: 'dev-cloudtrail',
    } as AWSEventSource,
    cloudGroupName: ['development', 'testing'],
    eventProcessEnabled: false,
    userActivityEnabled: true,
  },
  {
    id: '3',
    name: 'Staging Environment',
    provider: 'AWS',
    credentialType: 'ACCESS_KEY',
    credentials: {
      accessKeyId: 'AKIA********S78M',
      secretAccessKey: 'bN2t********5vC1',
    } as AWSCredential,
    regionList: ['ap-northeast-2', 'us-west-2'],
    proxyUrl: 'https://proxy.staging.company.com:8080',
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'WEEK',
      weekday: 'SUN',
      hour: '1',
      minute: '30',
    } as ScheduleScanSetting,
    eventSource: {
      cloudTrailName: 'staging-cloudtrail',
    } as AWSEventSource,
    cloudGroupName: ['staging'],
    eventProcessEnabled: true,
    userActivityEnabled: false,
  },
  {
    id: '4',
    name: 'Azure Production Subscription',
    provider: 'AZURE',
    credentialType: 'APPLICATION',
    credentials: {
      tenantId: '12345678-****-****-****-********90ab',
      subscriptionId: '87654321-****-****-****-********cdef',
      applicationId: 'abcdef12-****-****-****-********3456',
      secretKey: 'xyz789********ABC123',
    } as AzureCredential,
    regionList: ['Korea Central', 'East US', 'West Europe'],
    proxyUrl: '',
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'DAY',
      hour: '3',
      minute: '0',
    } as ScheduleScanSetting,
    eventSource: {
      storageAccountName: 'azureprodlogs',
    } as AzureEventSource,
    cloudGroupName: ['production'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
  },
  {
    id: '5',
    name: 'Azure Dev/Test Subscription',
    provider: 'AZURE',
    credentialType: 'APPLICATION',
    credentials: {
      tenantId: '11111111-****-****-****-********2222',
      subscriptionId: '33333333-****-****-****-********4444',
      applicationId: '55555555-****-****-****-********6666',
      secretKey: 'dev123********XYZ789',
    } as AzureCredential,
    regionList: ['Korea Central'],
    proxyUrl: '',
    scheduleScanEnabled: false,
    scheduleScanSetting: undefined,
    eventSource: {
      storageAccountName: 'azuredevlogs',
    } as AzureEventSource,
    cloudGroupName: ['development'],
    eventProcessEnabled: false,
    userActivityEnabled: false,
  },
  {
    id: '6',
    name: 'GCP Production Project',
    provider: 'GCP',
    credentialType: 'JSON_TEXT',
    credentials: {
      projectId: 'gcp-prod-project-123456',
      jsonText:
        '{"type": "service_account", "project_id": "gcp-prod-project-123456", "private_key_id": "****", "private_key": "-----BEGIN PRIVATE KEY-----\\n****\\n-----END PRIVATE KEY-----\\n", "client_email": "****@gcp-prod-project-123456.iam.gserviceaccount.com"}',
    } as GCPCredential,
    regionList: ['asia-northeast3', 'us-central1'],
    proxyUrl: '',
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'HOUR',
      minute: '0',
    } as ScheduleScanSetting,
    eventSource: {
      storageAccountName: 'gcp-prod-audit-logs',
    } as GCPEventSource,
    cloudGroupName: ['production'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
  },
  {
    id: '7',
    name: 'GCP Analytics Project',
    provider: 'GCP',
    credentialType: 'JSON_TEXT',
    credentials: {
      projectId: 'gcp-analytics-789012',
      jsonText:
        '{"type": "service_account", "project_id": "gcp-analytics-789012", "private_key_id": "****", "private_key": "-----BEGIN PRIVATE KEY-----\\n****\\n-----END PRIVATE KEY-----\\n", "client_email": "****@gcp-analytics-789012.iam.gserviceaccount.com"}',
    } as GCPCredential,
    regionList: ['asia-northeast3', 'us-west1', 'europe-west1'],
    proxyUrl: 'https://proxy.analytics.company.com:3128',
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'MONTH',
      date: '1',
      hour: '0',
      minute: '0',
    } as ScheduleScanSetting,
    eventSource: {
      storageAccountName: 'gcp-analytics-logs',
    } as GCPEventSource,
    cloudGroupName: ['analytics'],
    eventProcessEnabled: true,
    userActivityEnabled: false,
  },
  {
    id: '8',
    name: 'AWS Security Account',
    provider: 'AWS',
    credentialType: 'ACCESS_KEY',
    credentials: {
      accessKeyId: 'AKIA********SEC8',
      secretAccessKey: 'zQ7m********9rT4',
      roleArn: 'arn:aws:iam::999888777666:role/SecurityAuditRole',
    } as AWSCredential,
    regionList: ['global', 'us-east-1', 'ap-northeast-2'],
    proxyUrl: '',
    scheduleScanEnabled: true,
    scheduleScanSetting: {
      frequency: 'DAY',
      hour: '6',
      minute: '0',
    } as ScheduleScanSetting,
    eventSource: {
      cloudTrailName: 'security-audit-trail',
    } as AWSEventSource,
    cloudGroupName: ['security'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
  },
];

export async function GET(
  _: Request,
  { params }: { params: Promise<GetCloudInfoParams> },
) {
  try {
    const { id } = await params;

    // 실제 API 응답처럼 약간의 지연 추가
    await new Promise((resolve) => setTimeout(resolve, 500));

    const cloudDetail = mockCloudDetails.find((cloud) => cloud.id === id);

    if (!cloudDetail) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cloud not found',
          timestamp: new Date().toISOString(),
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: cloudDetail,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cloud detail',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
