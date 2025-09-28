import { Cloud } from '@/shared/types/types';

// POST 클라우드 생성
export interface PostCreateCloudInfoParams {
  data: Cloud;
  timestamp: string;
}

export interface PostCreateCloudInfoResponse {
  message: string;
}
