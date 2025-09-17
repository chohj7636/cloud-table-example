'use client';

import { createPortal } from 'react-dom';

import { useCloudDialog } from '@/hooks/useCloudDialog';

import { Button } from './ui/button';

/**
 * CloudDialog 컴포넌트
 * 클라우드 다이얼로그 컴포넌트
 *
 * 해당 컴포넌트는 애플리케이션 전역에서 다이얼로그를 렌더링 할 수 있습니다.
 * useCloudDialog 훅을 사용하여 다이얼로그 상태를 관리하고 제어합니다.
 */

const CloudDialog = () => {
  const { dialogInfo, closeCloudDialog } = useCloudDialog();

  return dialogInfo
    ? createPortal(
        <div className="fixed top-0 left-0 z-[9999] h-screen w-full bg-[rgba(0,0,0,0.6)]">
          <div
            id="dialog-layout"
            className="fixed top-1/2 left-1/2 flex w-[460px] translate-x-[-50%] translate-y-[-50%] flex-col justify-between rounded-[8px] bg-white px-5 pt-10 pb-8"
          >
            {/* body */}
            body
            {/* 버튼 그룹 */}
            <div className="mt-8 grid grid-cols-2 gap-2">
              <Button onClick={closeCloudDialog}>취소</Button>
              <Button onClick={closeCloudDialog}>
                {dialogInfo.confirmButton.text}
              </Button>
            </div>
          </div>
        </div>,
        document.getElementById('cloud-dialog') as HTMLElement,
      )
    : null;
};

export default CloudDialog;
