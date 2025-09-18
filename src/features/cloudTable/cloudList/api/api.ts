import { GetCloudTableResponse } from './type';

export const getCloudListApi = async (): Promise<GetCloudTableResponse> => {
  try {
    const response = await fetch('http://localhost:3000/api/cloudList', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch clouds');
    }

    const data = (await response.json()) as GetCloudTableResponse;
    return data;
  } catch (error) {
    console.error('Error fetching clouds:', error);
    return {
      data: [],
      timestamp: new Date().toISOString(),
    };
  }
};
