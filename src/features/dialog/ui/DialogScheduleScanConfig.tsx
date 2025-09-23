import React from 'react';

import DefaultSelect from '@/shared/components/DefaultSelect';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { ScheduleScanSetting } from '@/shared/types/types';

interface DialogScheduleScanConfigProps {
  scheduleScanEnabled: boolean;
  scheduleScanSetting: ScheduleScanSetting | undefined;
  setScheduleScanEnabled: (enabled: boolean) => void;
  updateScheduleScanSetting: (setting: Partial<ScheduleScanSetting>) => void;
}

const DialogScheduleScanConfig: React.FC<DialogScheduleScanConfigProps> =
  React.memo(
    ({
      scheduleScanEnabled,
      scheduleScanSetting,
      setScheduleScanEnabled,
      updateScheduleScanSetting,
    }) => {
      // 분 옵션 생성 (5분 단위)
      const minuteOptions = Array.from({ length: 12 }, (_, i) => {
        const value = (i * 5).toString();
        return { label: `${value}분`, value };
      });

      // 시간 옵션 생성 (0-23)
      const hourOptions = Array.from({ length: 24 }, (_, i) => ({
        label: `${i}시`,
        value: i.toString(),
      }));

      // 요일 옵션
      const weekdayOptions = [
        { label: '월요일', value: 'MON' },
        { label: '화요일', value: 'TUE' },
        { label: '수요일', value: 'WED' },
        { label: '목요일', value: 'THU' },
        { label: '금요일', value: 'FRI' },
        { label: '토요일', value: 'SAT' },
        { label: '일요일', value: 'SUN' },
      ];

      // 날짜 옵션 생성 (1-28)
      const dateOptions = Array.from({ length: 28 }, (_, i) => {
        const value = (i + 1).toString();
        return { label: `${value}일`, value };
      });

      const handleScheduleScanToggle = () => {
        setScheduleScanEnabled(!scheduleScanEnabled);
      };

      const handleFrequencyChange = (value: string) => {
        updateScheduleScanSetting({
          frequency: value as 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
        });
      };

      const handleDateChange = (value: string) => {
        updateScheduleScanSetting({ date: value });
      };

      const handleWeekdayChange = (value: string) => {
        updateScheduleScanSetting({
          weekday: value as
            | 'MON'
            | 'TUE'
            | 'WED'
            | 'THU'
            | 'FRI'
            | 'SAT'
            | 'SUN',
        });
      };

      const handleHourChange = (value: string) => {
        updateScheduleScanSetting({ hour: value });
      };

      const handleMinuteChange = (value: string) => {
        updateScheduleScanSetting({ minute: value });
      };

      return (
        <div className="space-y-8">
          <h3 className="border-b py-2 pl-2 text-lg font-bold">
            스캐닝 스케줄 설정
          </h3>
          <div className="space-y-6 pl-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label className="text-[16px]">Active Schedule Scan</Label>
                <p className="text-[14px] text-gray-500">
                  Enable the schedule scan to automatically scan the cloud
                  resources periodically.
                </p>
              </div>
              <Switch
                checked={scheduleScanEnabled}
                onCheckedChange={handleScheduleScanToggle}
              />
            </div>

            {scheduleScanEnabled && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-[16px]">Set Scan Frequency</Label>
                  <DefaultSelect
                    className="w-full"
                    options={[
                      { label: 'Monthly', value: 'MONTH' },
                      { label: 'Weekly', value: 'WEEK' },
                      { label: 'Daily', value: 'DAY' },
                      { label: 'Hourly', value: 'HOUR' },
                    ]}
                    placeholder="Select frequency"
                    value={scheduleScanSetting?.frequency || ''}
                    onValueChange={handleFrequencyChange}
                  />
                </div>

                {scheduleScanEnabled && (
                  <div className="flex flex-col gap-4 pl-8">
                    {scheduleScanSetting?.frequency === 'MONTH' && (
                      <div className="flex flex-col gap-2">
                        <Label className="text-gray-600">Date</Label>
                        <DefaultSelect
                          className="w-full"
                          options={dateOptions}
                          placeholder="Select date"
                          value={scheduleScanSetting?.date || ''}
                          onValueChange={handleDateChange}
                        />
                      </div>
                    )}

                    {scheduleScanSetting?.frequency === 'WEEK' && (
                      <div className="flex flex-col gap-2">
                        <Label className="text-gray-600">Day of Week</Label>
                        <DefaultSelect
                          className="w-full"
                          options={weekdayOptions}
                          placeholder="Select day of week"
                          value={scheduleScanSetting?.weekday || ''}
                          onValueChange={handleWeekdayChange}
                        />
                      </div>
                    )}

                    {scheduleScanSetting?.frequency !== 'HOUR' && (
                      <div className="flex flex-col gap-2">
                        <Label className="text-gray-600">Hour</Label>
                        <DefaultSelect
                          className="w-full"
                          options={hourOptions}
                          placeholder="시간 선택"
                          value={scheduleScanSetting?.hour || ''}
                          onValueChange={handleHourChange}
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <Label className="text-gray-600">Minute</Label>
                      <DefaultSelect
                        className="w-full"
                        options={minuteOptions}
                        placeholder="분 선택"
                        value={scheduleScanSetting?.minute || ''}
                        onValueChange={handleMinuteChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    },
  );

DialogScheduleScanConfig.displayName = 'DialogScheduleScanConfig';

export default DialogScheduleScanConfig;
