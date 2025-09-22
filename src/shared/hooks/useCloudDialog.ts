import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  AWSCredential,
  AzureCredential,
  Cloud,
  GCPCredential,
} from '../types/types';

/**
 * 클라우드 다이얼로그 상태 관리 훅
 * 어떤 위치의 컴포넌트에서도 다이얼로그를 띄울 수 있도록 훅으로 다이얼로그 관리
 * 다이얼로그 컴포넌트는 createPortal을 사용하여 루트 요소 위치함
 * type 설정 값에 따라 생성, 수정 다이얼로그 선택 가능
 */

// 초기값
const initialData: Cloud = {
  id: '',
  name: '',
  provider: 'AWS',

  credentialType: 'ACCESS_KEY',
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  } as AWSCredential | AzureCredential | GCPCredential,

  regionList: ['global'],

  scheduleScanEnabled: false,

  eventProcessEnabled: false,
  userActivityEnabled: false,
};

interface CloudDialogInfo {
  type: 'create' | 'edit';
  confirmButton: {
    text: string;
    clickEvent: () => void;
  };
}

interface CloudDialogState {
  dialogInfo: CloudDialogInfo | null;
  cloudDialog: (dialogInfo: CloudDialogInfo) => void;
  // cloud data
  cloudData: Cloud;
  setCloudData: (cloudData: Cloud) => void;
  closeCloudDialog: () => void;
}

export const useCloudDialog = create<CloudDialogState>()(
  devtools((set) => ({
    dialogInfo: null,
    cloudDialog: (dialogInfo) => set({ dialogInfo }),
    cloudData: initialData,
    setCloudData: (cloudData) => set({ cloudData }),
    closeCloudDialog: () => set({ dialogInfo: null, cloudData: initialData }),
  })),
);
