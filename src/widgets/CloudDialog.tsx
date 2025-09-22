'use client';

import { createPortal } from 'react-dom';

import DialogCredentialsConfig from '@/features/dialog/ui/DIalogCredentialsConfig';
import DialogBasicConfig from '@/features/dialog/ui/DialogBasicConfig';
import DialogDetailConfig from '@/features/dialog/ui/DialogDetailConfig';
import DialogRegionOrNetwork from '@/features/dialog/ui/DialogRegionOrNetwork';
import DialogScheduleScanConfig from '@/features/dialog/ui/DialogScheduleScanConfig';
import { Button } from '@/shared/components/ui/button';
import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import { X } from 'lucide-react';

/**
 * CloudDialog 컴포넌트
 * 클라우드 다이얼로그 컴포넌트
 *
 * 해당 컴포넌트는 애플리케이션 전역에서 다이얼로그를 렌더링 할 수 있습니다.
 * useCloudDialog 훅을 사용하여 다이얼로그 상태를 관리하고 제어합니다.
 */

const CloudDialog = () => {
  const { dialogInfo, closeCloudDialog } = useCloudDialog();

  /**
   * Create Cloud fields
   *
   * 기본 설정
   * Cloud Name *
   * Provider *
   * Key Registration Method
   *
   * 인증
   * Credentials
   *   Access Key
   *   Secret Key
   *
   * 지역 및 네트워크
   * Region
   * Proxy URL
   *
   * 스캐닝 스케줄 설정
   * Scan Schedule Setting
   *    Set Scan Frequency
   *        Daily()
   *        date
   *        Day of week
   *        hour
   *        minute
   *
   * 고급 설정
   * cloudGroupName 클라우드 그룹 이름
   * Event Integration 이벤트 소스
   * eventProcessEnabled 이벤트 처리 활성화
   * userActivityEnabled 사용자 활동 추적
   *
   */

  return dialogInfo
    ? createPortal(
        <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.6)]">
          <div
            id="dialog-layout"
            className="fixed top-1/2 left-1/2 flex h-5/6 w-3xl translate-x-[-50%] translate-y-[-50%] flex-col justify-between rounded-lg bg-white p-5"
          >
            {/* inner */}
            <div className="w-full flex-1 overflow-y-auto">
              {/* header */}
              <div className="my-4 flex w-full items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {dialogInfo.type === 'create' ? 'Create Cloud' : 'Edit Cloud'}
                </h2>
                <Button variant="ghost" onClick={closeCloudDialog}>
                  <X size={20} />
                </Button>
              </div>

              {/* body */}
              <div className="space-y-5 px-2">
                {/* 기본 설정 */}
                <DialogBasicConfig />

                {/* 인증 */}
                <DialogCredentialsConfig />

                {/* 지역 및 네트워크 */}
                <DialogRegionOrNetwork />

                {/* 스캐닝 스케줄 설정 */}
                <DialogScheduleScanConfig />

                {/* 고급 설정 */}
                <DialogDetailConfig />
              </div>
            </div>

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
