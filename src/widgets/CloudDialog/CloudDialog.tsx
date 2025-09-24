'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useCreateCloud } from '@/features/cloudTable/createCloud/hooks/useCreateCloud';
import { useEditCloudInfo } from '@/features/cloudTable/editCloud/hooks/useEditCloudInfo';
import DialogSkeleton from '@/shared/components/skeleton/DIalogSkeleton';
import { Button } from '@/shared/components/ui/button';
import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import { isValidInput } from '@/shared/lib/utils';
import {
  AWSCredential,
  AWSCredentialType,
  AWSEventSource,
  AzureCredential,
  AzureCredentialType,
  AzureEventSource,
  Cloud,
  GCPCredential,
  GCPCredentialType,
  GCPEventSource,
  Provider,
  ScheduleScanSetting,
  initialCloudData,
} from '@/shared/types/types';
import DialogCredentialsConfig from '@/widgets/CloudDialog/dialogConfig/DIalogCredentialsConfig';
import DialogBasicConfig from '@/widgets/CloudDialog/dialogConfig/DialogBasicConfig';
import DialogDetailConfig from '@/widgets/CloudDialog/dialogConfig/DialogDetailConfig';
import DialogRegionOrNetwork from '@/widgets/CloudDialog/dialogConfig/DialogRegionOrNetwork';
import DialogScheduleScanConfig from '@/widgets/CloudDialog/dialogConfig/DialogScheduleScanConfig';
import { X } from 'lucide-react';

/**
 * CloudDialog 컴포넌트
 * 클라우드 다이얼로그 컴포넌트
 *
 * 해당 컴포넌트는 애플리케이션 전역에서 다이얼로그를 렌더링 할 수 있습니다.
 * useCloudDialog 훅을 사용하여 다이얼로그 상태를 관리하고 제어합니다.
 */

const CloudDialog = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  // state
  const [isValidate, setIsValidate] = useState(false);

  // cloud dialog hook
  const { dialogInfo, closeCloudDialog } = useCloudDialog();

  // create 모드 일 때 query 호출
  const { createCloudInfo } = useCreateCloud();

  // edit 모드 일 때 query 호출
  const { cloudInfoData, isCloudInfoLoading, cloudInfoError, editCloudInfo } =
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

  // confirm handler
  const confirmHandler = () => {
    const currentFormData: Cloud = {
      id,
      name,
      provider,
      credentialType,
      credentials,
      regionList,
      proxyUrl,
      scheduleScanEnabled,
      scheduleScanSetting:
        scheduleScanEnabled && scheduleScanSetting
          ? scheduleScanSetting
          : undefined,
      eventSource,
      cloudGroupName,
      eventProcessEnabled,
      userActivityEnabled,
    };

    if (dialogInfo?.type === 'edit') {
      // 클라우드 수정 query 호출
      editCloudInfo({
        data: currentFormData,
        timestamp: new Date().toISOString(),
      });
    } else {
      // 클라우드 생성 query 호출
      createCloudInfo({
        data: currentFormData,
        timestamp: new Date().toISOString(),
      });
    }

    closeCloudDialog();
  };

  // 다이얼로그가 열릴 때 배경 스크롤을 방지하는 효과
  useEffect(() => {
    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;

    // 다이얼로그가 열릴 때 body를 고정하고 현재 스크롤 위치를 저장
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';

    return () => {
      // 다이얼로그가 닫힐 때 원래 스크롤 위치로 복원
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // background 클릭 시 닫기
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current && backgroundRef.current === e.target) {
      closeCloudDialog();
    }
  };

  // esc 키로 닫기
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCloudDialog();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [closeCloudDialog]);

  // 폼 유효성 검증
  useEffect(() => {
    const validateForm = () => {
      // 기본 필드 검증
      const isNameValid = isValidInput(name);
      const isProviderValid = isValidInput(provider);

      // Provider별 Credentials 검증
      let areCredentialsValid = false;

      switch (provider) {
        case 'AWS':
          const awsCredentials = credentials as AWSCredential;
          areCredentialsValid =
            isValidInput(awsCredentials.accessKeyId) &&
            isValidInput(awsCredentials.secretAccessKey);
          break;

        case 'AZURE':
          const azureCredentials = credentials as AzureCredential;
          areCredentialsValid =
            isValidInput(azureCredentials.tenantId) &&
            isValidInput(azureCredentials.subscriptionId) &&
            isValidInput(azureCredentials.applicationId) &&
            isValidInput(azureCredentials.secretKey);
          break;

        case 'GCP':
          const gcpCredentials = credentials as GCPCredential;
          areCredentialsValid = isValidInput(gcpCredentials.jsonText);
          break;

        default:
          areCredentialsValid = false;
      }

      // 모든 필수 필드가 유효한지 확인
      const isFormValid = isNameValid && isProviderValid && areCredentialsValid;

      setIsValidate(isFormValid);
    };

    validateForm();
  }, [name, provider, credentials]);

  return dialogInfo
    ? createPortal(
        <div
          ref={backgroundRef}
          className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.6)]"
          onClick={handleBackgroundClick}
        >
          <div
            id="dialog-layout"
            className="fixed top-1/2 left-1/2 flex h-5/6 w-3xl translate-x-[-50%] translate-y-[-50%] flex-col justify-between rounded-lg bg-white p-5"
          >
            {/* header */}
            <div className="my-4 flex w-full items-center justify-between">
              <h2 className="text-2xl font-bold">
                {dialogInfo.type === 'create' ? 'Create Cloud' : 'Edit Cloud'}
              </h2>
              <Button variant="ghost" onClick={closeCloudDialog}>
                <X size={20} />
              </Button>
            </div>
            {/* inner */}
            {isCloudInfoLoading ? (
              <DialogSkeleton />
            ) : (
              <div className="w-full flex-1 space-y-5 overflow-y-auto px-2">
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
            )}

            {/* 버튼 그룹 */}
            <div className="grid grid-cols-2 gap-2 pt-4">
              <Button variant="outline" className="" onClick={closeCloudDialog}>
                취소
              </Button>
              <Button onClick={confirmHandler}>
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
