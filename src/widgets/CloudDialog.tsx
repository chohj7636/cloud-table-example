'use client';

import { createPortal } from 'react-dom';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
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
   * Cloud Name *
   * Select Provider
   * Select Key Registration Method
   * Credentials
   *   Access Key
   *   Secret Key
   * Region
   * Proxy URL
   * Scan Schedule Setting
   * Set Scan Frequency
   *    Daily()
   *    date
   *    Day of week
   *    hour
   *    minute
   * Event Integration
   */

  return dialogInfo
    ? createPortal(
        <div className="fixed top-0 left-0 z-[9999] h-screen w-full bg-[rgba(0,0,0,0.6)]">
          <div
            id="dialog-layout"
            className="fixed top-1/2 left-1/2 flex h-3/4 w-3xl translate-x-[-50%] translate-y-[-50%] flex-col justify-between rounded-lg bg-white p-5"
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
              {/*
               * Create Cloud fields
               *
               * Cloud Name *
               * Select Provider
               * Select Key Registration Method
               * Credentials
               *   Access Key
               *   Secret Key
               * Region
               * Proxy URL
               * Scan Schedule Setting
               * Set Scan Frequency
               *    Daily()
               *    date
               *    Day of week
               *    hour
               *    minute
               * Event Integration
               */}
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>Cloud Name *</Label>
                  <Input />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Select Provider</Label>
                </div>
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
