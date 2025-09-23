'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useEditCloudInfo } from '@/features/dialog/hooks/useEditCloudInfo';
import DialogCredentialsConfig from '@/features/dialog/ui/DIalogCredentialsConfig';
import DialogBasicConfig from '@/features/dialog/ui/DialogBasicConfig';
import DialogDetailConfig from '@/features/dialog/ui/DialogDetailConfig';
import DialogRegionOrNetwork from '@/features/dialog/ui/DialogRegionOrNetwork';
import DialogScheduleScanConfig from '@/features/dialog/ui/DialogScheduleScanConfig';
import { Button } from '@/shared/components/ui/button';
import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import {
  AWSCredential,
  AWSCredentialType,
  AWSEventSource,
  AzureCredential,
  AzureCredentialType,
  AzureEventSource,
  GCPCredential,
  GCPCredentialType,
  GCPEventSource,
  Provider,
  ScheduleScanSetting,
  initialCloudData,
} from '@/shared/types/types';
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

  // edit 모드 일 때만 query 호출
  const { cloudInfoData, isCloudInfoLoading, cloudInfoError } =
    useEditCloudInfo(
      dialogInfo?.editCloudId || '',
      dialogInfo?.type === 'edit' && !!dialogInfo?.editCloudId,
    );

  // 각 필드별 개별 state
  const [id, setId] = useState(initialCloudData.id);
  const [name, setName] = useState(initialCloudData.name);
  const [provider, setProvider] = useState<Provider>(initialCloudData.provider);
  const [credentialType, setCredentialType] = useState<
    AWSCredentialType | AzureCredentialType | GCPCredentialType
  >(initialCloudData.credentialType);
  const [credentials, setCredentials] = useState<
    AWSCredential | AzureCredential | GCPCredential
  >(initialCloudData.credentials);
  const [regionList, setRegionList] = useState<string[]>(
    initialCloudData.regionList,
  );
  const [proxyUrl, setProxyUrl] = useState<string | undefined>(
    initialCloudData.proxyUrl,
  );
  const [scheduleScanEnabled, setScheduleScanEnabled] = useState(
    initialCloudData.scheduleScanEnabled,
  );
  const [scheduleScanSetting, setScheduleScanSetting] = useState<
    ScheduleScanSetting | undefined
  >(initialCloudData.scheduleScanSetting);
  const [eventSource, setEventSource] = useState<
    AWSEventSource | AzureEventSource | GCPEventSource | undefined
  >(initialCloudData.eventSource);
  const [cloudGroupName, setCloudGroupName] = useState<string[] | undefined>(
    initialCloudData.cloudGroupName,
  );
  const [eventProcessEnabled, setEventProcessEnabled] = useState(
    initialCloudData.eventProcessEnabled,
  );
  const [userActivityEnabled, setUserActivityEnabled] = useState(
    initialCloudData.userActivityEnabled,
  );

  // API에서 받은 데이터를 폼 상태에 반영
  useEffect(() => {
    if (cloudInfoData && dialogInfo?.type === 'edit') {
      setId(cloudInfoData.id);
      setName(cloudInfoData.name);
      setProvider(cloudInfoData.provider);
      setCredentialType(cloudInfoData.credentialType);
      setCredentials(cloudInfoData.credentials);
      setRegionList(cloudInfoData.regionList);
      setProxyUrl(cloudInfoData.proxyUrl);
      setScheduleScanEnabled(cloudInfoData.scheduleScanEnabled);
      setScheduleScanSetting(cloudInfoData.scheduleScanSetting);
      setEventSource(cloudInfoData.eventSource);
      setCloudGroupName(cloudInfoData.cloudGroupName);
      setEventProcessEnabled(cloudInfoData.eventProcessEnabled);
      setUserActivityEnabled(cloudInfoData.userActivityEnabled);
    }
  }, [cloudInfoData, dialogInfo?.type]);

  // 중첩 객체 업데이트를 위한 헬퍼 함수들
  const updateCredentials = useCallback(
    (
      credentialUpdates: Partial<
        AWSCredential | AzureCredential | GCPCredential
      >,
    ) => {
      setCredentials((prev) => ({ ...prev, ...credentialUpdates }));
    },
    [],
  );

  const updateScheduleScanSetting = useCallback(
    (settingUpdates: Partial<ScheduleScanSetting>) => {
      setScheduleScanSetting(
        (prev) =>
          ({ ...(prev || {}), ...settingUpdates }) as ScheduleScanSetting,
      );
    },
    [],
  );

  const updateEventSource = useCallback(
    (
      eventSourceUpdates: Partial<
        AWSEventSource | AzureEventSource | GCPEventSource
      >,
    ) => {
      setEventSource((prev) => ({ ...(prev || {}), ...eventSourceUpdates }));
    },
    [],
  );

  // test handler
  const onClickTest = () => {
    const currentFormData = {
      id,
      name,
      provider,
      credentialType,
      credentials,
      regionList,
      proxyUrl,
      scheduleScanEnabled,
      scheduleScanSetting: {
        frequency: scheduleScanSetting?.frequency,
        date:
          scheduleScanSetting?.frequency === 'MONTH'
            ? scheduleScanSetting?.date
            : undefined,
        weekday:
          scheduleScanSetting?.frequency === 'WEEK'
            ? scheduleScanSetting?.weekday
            : undefined,
        hour:
          scheduleScanSetting?.frequency !== 'HOUR'
            ? scheduleScanSetting?.hour
            : undefined,
        minute: scheduleScanSetting?.minute,
      },
      eventSource,
      cloudGroupName,
      eventProcessEnabled,
      userActivityEnabled,
    };
    console.log('현재 폼 데이터:', currentFormData);
    closeCloudDialog();
  };

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
                <DialogBasicConfig
                  name={name}
                  provider={provider}
                  setName={setName}
                  setProvider={setProvider}
                />

                {/* 인증 */}
                <DialogCredentialsConfig
                  provider={provider}
                  credentialType={credentialType}
                  credentials={credentials}
                  setCredentialType={setCredentialType}
                  updateCredentials={updateCredentials}
                />

                {/* 지역 및 네트워크 */}
                <DialogRegionOrNetwork
                  provider={provider}
                  regionList={regionList}
                  proxyUrl={proxyUrl}
                  setRegionList={setRegionList}
                  setProxyUrl={setProxyUrl}
                />

                {/* 스캐닝 스케줄 설정 */}
                <DialogScheduleScanConfig
                  scheduleScanEnabled={scheduleScanEnabled}
                  scheduleScanSetting={scheduleScanSetting}
                  setScheduleScanEnabled={setScheduleScanEnabled}
                  updateScheduleScanSetting={updateScheduleScanSetting}
                />

                {/* 고급 설정 */}
                <DialogDetailConfig
                  provider={provider}
                  eventSource={eventSource}
                  cloudGroupName={cloudGroupName}
                  eventProcessEnabled={eventProcessEnabled}
                  userActivityEnabled={userActivityEnabled}
                  updateEventSource={updateEventSource}
                  setCloudGroupName={setCloudGroupName}
                  setEventProcessEnabled={setEventProcessEnabled}
                  setUserActivityEnabled={setUserActivityEnabled}
                />
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="mt-8 grid grid-cols-2 gap-2">
              <Button onClick={closeCloudDialog}>취소</Button>
              <Button onClick={onClickTest}>
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
