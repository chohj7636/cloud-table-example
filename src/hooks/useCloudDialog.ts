import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * 클라우드 다이얼로그 상태 관리 훅
 * 어떤 위치의 컴포넌트에서도 다이얼로그를 띄울 수 있도록 훅으로 다이얼로그 관리
 * 다이얼로그 컴포넌트는 createPortal을 사용하여 루트 요소 위치함
 * type 설정 값에 따라 생성, 수정 다이얼로그 선택 가능
 */

interface CloudDialogInfo {
  type: 'create' | 'edit';
  confirmButton: {
    text: string;
    clickEvent: () => void;
  };
  cancelButton: {
    text: string;
    clickEvent: () => void;
  };
}

interface CloudDialogState {
  dialogInfo: CloudDialogInfo | null;
  cloudDialog: (dialogInfo: CloudDialogInfo) => void;
  closeCloudDialog: () => void;
}

export const useCloudDialog = create<CloudDialogState>()(
  devtools((set) => ({
    dialogInfo: null,
    cloudDialog: (dialogInfo) => set({ dialogInfo }),
    closeCloudDialog: () => set({ dialogInfo: null }),
  })),
);
