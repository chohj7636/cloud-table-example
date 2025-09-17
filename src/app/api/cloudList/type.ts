import { NextResponse } from 'next/server';

import { Provider } from '../types';

export interface CloudTable {
  id: string; // GET 요청 시 획득
  provider: Provider;
  name: string;
  cloudGroupName?: string[]; // 선택 가능한 cloudGroupName 목록을 서버에서 받아야하지만, 편의상 상수로 선언하여 사용
  eventProcessEnabled: boolean;
  userActivityEnabled: boolean;
  regionList: string[];
}

// GET Cloud Table
export interface GetCloudTableResponse extends NextResponse {
  data: CloudTable[];
  timestamp: string;
}
