'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import DefaultSelect from '@/shared/components/DefaultSelect';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import {
  AWSCredentialType,
  AWSRegionList,
  CloudGroupNameList,
  Provider,
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

  // state
  const [provider, setProvider] = useState<Provider | undefined>(undefined);
  const [credentialType, setCredentialType] = useState<string | undefined>(
    undefined,
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [proxyUrl, setProxyUrl] = useState<string>('');
  const [scheduleScanEnabled, setScheduleScanEnabled] =
    useState<boolean>(false);
  const [scheduleFrequency, setScheduleFrequency] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleWeekday, setScheduleWeekday] = useState<string>('');
  const [scheduleHour, setScheduleHour] = useState<string>('');
  const [scheduleMinute, setScheduleMinute] = useState<string>('');
  const [cloudTrailName, setCloudTrailName] = useState<string>('');
  const [selectedCloudGroups, setSelectedCloudGroups] = useState<string[]>([]);
  const [eventProcessEnabled, setEventProcessEnabled] =
    useState<boolean>(false);
  const [userActivityEnabled, setUserActivityEnabled] =
    useState<boolean>(false);

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

  const printCredentialType = (providerType: Provider) => {
    switch (providerType) {
      case 'AWS':
        return [
          { label: 'Access Key', value: 'ACCESS_KEY' },
          { label: 'Assume Role', value: 'ASSUME_ROLE' },
          { label: 'Roles Anywhere', value: 'ROLES_ANYWHERE' },
        ];
      case 'AZURE':
        return [{ label: 'Application', value: 'APPLICATION' }];
      case 'GCP':
        return [{ label: 'JSON Text', value: 'JSON_TEXT' }];

      default:
        return [];
    }
  };

  const getRegionsByProvider = (providerType: Provider) => {
    switch (providerType) {
      case 'AWS':
        return AWSRegionList.map((region) => ({
          label: region,
          value: region,
        }));
      case 'AZURE':
        return []; // Azure regions not implemented
      case 'GCP':
        return []; // GCP regions not implemented
      default:
        return [];
    }
  };

  const handleRegionToggle = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
  };

  const handleCloudGroupToggle = (group: string) => {
    setSelectedCloudGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    );
  };

  const printCredentialComponent = (providerType: Provider) => {
    switch (providerType) {
      case 'AWS':
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Access Key *</Label>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Secret Key *</Label>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Role ARN</Label>
              <Input />
            </div>
          </div>
        );
      case 'AZURE':
        return <div>AZURE</div>;
      case 'GCP':
        return <div>GCP</div>;

      default:
        return null;
    }
  };

  const printEventSourceComponent = (providerType: Provider) => {
    switch (providerType) {
      case 'AWS':
        return (
          <div className="flex flex-col gap-2">
            <Label>CloudTrail Name</Label>
            <Input
              value={cloudTrailName}
              onChange={(e) => setCloudTrailName(e.target.value)}
              placeholder="Enter CloudTrail name"
            />
          </div>
        );
      case 'AZURE':
        return (
          <div className="flex flex-col gap-2">
            <Label>Storage Account Name</Label>
            <Input placeholder="Enter storage account name" />
          </div>
        );
      case 'GCP':
        return (
          <div className="flex flex-col gap-2">
            <Label>Storage Account Name</Label>
            <Input placeholder="Enter storage account name" />
          </div>
        );
      default:
        return null;
    }
  };

  return dialogInfo
    ? createPortal(
        <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.6)]">
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
               */}
              <div className="space-y-4 px-2">
                {/* 기본 설정 */}
                <h3 className="border-b py-2 text-lg font-bold">기본 설정</h3>
                <div className="flex flex-col gap-2">
                  <Label className="text-[16px]">Cloud Name *</Label>
                  <Input />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-[16px]">Provider *</Label>
                  <DefaultSelect
                    className="w-full"
                    options={[
                      { label: 'AWS', value: 'AWS' },
                      { label: 'Azure', value: 'AZURE', disabled: true },
                      { label: 'GCP', value: 'GCP', disabled: true },
                    ]}
                    placeholder="Provider"
                    value={provider}
                    onValueChange={(value) => setProvider(value as Provider)}
                  />
                </div>

                {/* 인증 */}
                <h3 className="border-b py-2 text-lg font-bold">인증</h3>

                <div className="flex flex-col gap-2">
                  <Label className="text-[16px]">
                    Key Registration Method *
                  </Label>
                  {provider && (
                    <DefaultSelect
                      className="w-full"
                      options={printCredentialType(provider)}
                      placeholder="credentialType"
                      value={credentialType}
                      onValueChange={setCredentialType}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-[16px]">Credentials *</Label>
                  <div className="pl-4">
                    {provider && printCredentialComponent(provider)}
                  </div>
                </div>

                {/* 지역 및 네트워크 */}
                <h3 className="border-b py-2 text-lg font-bold">
                  지역 및 네트워크
                </h3>

                {/* Region List */}
                {provider && (
                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px]">Regions *</Label>
                    <div className="grid grid-cols-3 gap-2 rounded-md border p-3">
                      {getRegionsByProvider(provider).map((region) => (
                        <label
                          key={region.value}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Input
                            type="checkbox"
                            checked={selectedRegions.includes(region.value)}
                            onChange={() => handleRegionToggle(region.value)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm">{region.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Proxy URL */}
                <div className="flex flex-col gap-2">
                  <Label>Proxy URL</Label>
                  <Input
                    value={proxyUrl}
                    onChange={(e) => setProxyUrl(e.target.value)}
                    placeholder="Enter proxy URL (optional)"
                  />
                </div>

                {/* 스캐닝 스케줄 설정 */}
                <h3 className="border-b py-2 text-lg font-bold">
                  스캐닝 스케줄 설정
                </h3>

                {/* Schedule Scan Setting */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="scheduleScan"
                      checked={scheduleScanEnabled}
                      onChange={(e) => setScheduleScanEnabled(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="scheduleScan">Enable Schedule Scan</Label>
                  </div>

                  {scheduleScanEnabled && (
                    <div className="space-y-4 pl-6">
                      <div className="flex flex-col gap-2">
                        <Label>Frequency *</Label>
                        <DefaultSelect
                          options={[
                            { label: 'Every Hour', value: 'HOUR' },
                            { label: 'Daily', value: 'DAY' },
                            { label: 'Weekly', value: 'WEEK' },
                            { label: 'Monthly', value: 'MONTH' },
                          ]}
                          placeholder="Select frequency"
                          value={scheduleFrequency}
                          onValueChange={setScheduleFrequency}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {scheduleFrequency === 'MONTH' && (
                          <div className="flex flex-col gap-2">
                            <Label>Date</Label>
                            <DefaultSelect
                              options={Array.from({ length: 28 }, (_, i) => ({
                                label: (i + 1).toString(),
                                value: (i + 1).toString(),
                              }))}
                              placeholder="Select date"
                              value={scheduleDate}
                              onValueChange={setScheduleDate}
                            />
                          </div>
                        )}

                        {scheduleFrequency === 'WEEK' && (
                          <div className="flex flex-col gap-2">
                            <Label>Day of Week</Label>
                            <DefaultSelect
                              options={[
                                { label: 'Monday', value: 'MON' },
                                { label: 'Tuesday', value: 'TUE' },
                                { label: 'Wednesday', value: 'WED' },
                                { label: 'Thursday', value: 'THU' },
                                { label: 'Friday', value: 'FRI' },
                                { label: 'Saturday', value: 'SAT' },
                                { label: 'Sunday', value: 'SUN' },
                              ]}
                              placeholder="Select day"
                              value={scheduleWeekday}
                              onValueChange={setScheduleWeekday}
                            />
                          </div>
                        )}

                        {(scheduleFrequency === 'DAY' ||
                          scheduleFrequency === 'WEEK' ||
                          scheduleFrequency === 'MONTH') && (
                          <div className="flex flex-col gap-2">
                            <Label>Hour</Label>
                            <DefaultSelect
                              options={Array.from({ length: 24 }, (_, i) => ({
                                label: i.toString().padStart(2, '0'),
                                value: i.toString(),
                              }))}
                              placeholder="Select hour"
                              value={scheduleHour}
                              onValueChange={setScheduleHour}
                            />
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <Label>Minute</Label>
                          <DefaultSelect
                            options={Array.from({ length: 12 }, (_, i) => ({
                              label: (i * 5).toString().padStart(2, '0'),
                              value: (i * 5).toString(),
                            }))}
                            placeholder="Select minute"
                            value={scheduleMinute}
                            onValueChange={setScheduleMinute}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 고급 설정 */}
                <h3 className="border-b py-2 text-lg font-bold">고급 설정</h3>

                {/* Event Integration */}
                {provider && (
                  <div className="flex flex-col gap-2">
                    <Label>Event Integration</Label>
                    {printEventSourceComponent(provider)}
                  </div>
                )}

                {/* Cloud Group Name */}
                <div className="flex flex-col gap-2">
                  <Label>Cloud Group</Label>
                  <div className="grid grid-cols-2 gap-2 rounded-md border p-3">
                    {CloudGroupNameList.map((group) => (
                      <label
                        key={group}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCloudGroups.includes(group)}
                          onChange={() => handleCloudGroupToggle(group)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm capitalize">{group}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full bg-gray-200" />

                {/* Toggle Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="eventProcess"
                      checked={eventProcessEnabled}
                      onChange={(e) => setEventProcessEnabled(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="eventProcess">Enable Event Process</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="userActivity"
                      checked={userActivityEnabled}
                      onChange={(e) => setUserActivityEnabled(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="userActivity">Enable User Activity</Label>
                  </div>
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
