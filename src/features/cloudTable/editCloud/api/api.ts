import { GetCloudInfoParams, GetCloudInfoResponse } from './type';

// GET 클라우드 상세 정보
export const getCloudInfoApi = async (
  params: GetCloudInfoParams,
): Promise<GetCloudInfoResponse> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/editCloud/${params.id}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cloud info');
    }

    const data = (await response.json()) as GetCloudInfoResponse;
    return data;
  } catch (error) {
    console.error('Error fetching cloud info:', error);
    return {
      data: null,
      timestamp: new Date().toISOString(),
    };
  }
};
