import { Cloud } from '@/shared/types/types';

// GET 클라우드 상세 정보
export interface GetCloudInfoParams {
  id: string;
}

export interface GetCloudInfoResponse {
  data: Cloud | null;
  timestamp: string;
}

// POST 클라우드 수정
export interface EditCloudInfoParams {
  data: Cloud;
  timestamp: string;
}

export interface EditCloudInfoResponse {
  message: string;
}
