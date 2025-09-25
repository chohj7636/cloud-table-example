import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import {
  AWSEventSource,
  AzureEventSource,
  CloudGroupNameList,
  GCPEventSource,
  Provider,
} from '@/shared/types/types';

interface DialogDetailConfigProps {
  provider: Provider;
  eventSource: AWSEventSource | AzureEventSource | GCPEventSource | undefined;
  cloudGroupName: string[] | undefined;
  eventProcessEnabled: boolean;
  userActivityEnabled: boolean;
  updateEventSource: (
    source: Partial<AWSEventSource | AzureEventSource | GCPEventSource>,
  ) => void;
  setCloudGroupName: (groups: string[] | undefined) => void;
  setEventProcessEnabled: (enabled: boolean) => void;
  setUserActivityEnabled: (enabled: boolean) => void;
}

const DialogDetailConfig: React.FC<DialogDetailConfigProps> = React.memo(
  ({
    provider,
    eventSource,
    cloudGroupName,
    eventProcessEnabled,
    userActivityEnabled,
    updateEventSource,
    setCloudGroupName,
    setEventProcessEnabled,
    setUserActivityEnabled,
  }) => {
    // state
    const [isOpenCollapsible, setIsOpenCollapsible] = useState(false);

    // ref
    const collapsibleRef = useRef<HTMLDivElement>(null);
    const contentBottomRef = useRef<HTMLDivElement>(null);

    // 펼쳐질 때 스크롤 자동 이동
    useEffect(() => {
      if (isOpenCollapsible && contentBottomRef.current) {
        // 애니메이션 완료 후 바닥으로 스크롤 이동
        setTimeout(() => {
          contentBottomRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          });
        }, 300); // 애니메이션 시간(300ms) 후 실행
      }
    }, [isOpenCollapsible]);

    const handleCloudTrailNameChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      updateEventSource({ cloudTrailName: e.target.value });
    };

    const handleStorageAccountNameChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      updateEventSource({ storageAccountName: e.target.value });
    };

    const handleCloudGroupToggle = (group: string) => {
      const currentGroups = cloudGroupName || [];
      const newGroups = currentGroups.includes(group)
        ? currentGroups.filter((g) => g !== group)
        : [...currentGroups, group];

      setCloudGroupName(newGroups);
    };

    const handleEventProcessToggle = () => {
      setEventProcessEnabled(!eventProcessEnabled);
    };

    const handleUserActivityToggle = () => {
      setUserActivityEnabled(!userActivityEnabled);
    };

    const printEventSourceComponent = (providerType: Provider) => {
      switch (providerType) {
        case 'AWS':
          return (
            <div className="flex flex-col gap-2 pl-4">
              <Label>CloudTrail Name</Label>
              <Input
                value={(eventSource as AWSEventSource)?.cloudTrailName || ''}
                onChange={handleCloudTrailNameChange}
                placeholder="Enter CloudTrail name"
              />
            </div>
          );
        case 'AZURE':
          return (
            <div className="flex flex-col gap-2 pl-4">
              <Label>Storage Account Name</Label>
              <Input
                value={
                  (eventSource as AzureEventSource)?.storageAccountName || ''
                }
                onChange={handleStorageAccountNameChange}
                placeholder="Enter storage account name"
              />
            </div>
          );
        case 'GCP':
          return (
            <div className="flex flex-col gap-2 pl-4">
              <Label>Storage Account Name</Label>
              <Input
                value={
                  (eventSource as GCPEventSource)?.storageAccountName || ''
                }
                onChange={handleStorageAccountNameChange}
                placeholder="Enter storage account name"
              />
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <Collapsible open={isOpenCollapsible} onOpenChange={setIsOpenCollapsible}>
        <div ref={collapsibleRef} className="mb-4 space-y-8">
          {/* Collapsible한 컴포넌트로 구현 */}
          <div className="flex w-full items-center gap-2 border-b">
            <h3 className="py-2 pl-2 text-lg font-bold">고급 설정</h3>
            <CollapsibleTrigger asChild>
              <Image
                className={`size-4 cursor-pointer transition-transform duration-300 ${
                  isOpenCollapsible ? 'rotate-180' : ''
                }`}
                src={'/icons/icon-collapsible.svg'}
                alt="icon-collapsible"
                width={16}
                height={16}
              />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="space-y-6 pl-4">
              {/* Event Integration */}
              {provider && (
                <div className="flex flex-col gap-4">
                  <Label className="text-[16px]">Event Integration</Label>
                  {printEventSourceComponent(provider)}
                </div>
              )}

              {/* Cloud Group Name */}
              <div className="flex flex-col gap-2">
                <Label className="text-[16px]">Cloud Group</Label>
                <div className="grid grid-cols-2 gap-2 rounded-md border p-3">
                  {CloudGroupNameList.map((group) => (
                    <label
                      key={group}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={cloudGroupName?.includes(group) || false}
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
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Label className="text-[16px]">Enable Event Process</Label>
                  <p className="text-[14px] text-gray-500">
                    Whether to process real-time events from the cloud.
                  </p>
                </div>
                <Switch
                  checked={eventProcessEnabled}
                  onCheckedChange={handleEventProcessToggle}
                />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Label className="text-[16px]">Enable User Activity</Label>
                  <p className="text-[14px] text-gray-500">
                    Track the usage patterns of users in the cloud.
                  </p>
                </div>
                <Switch
                  checked={userActivityEnabled}
                  onCheckedChange={handleUserActivityToggle}
                />
              </div>
              {/* 스크롤 바닥 기준점 */}
              <div ref={contentBottomRef} />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  },
);

DialogDetailConfig.displayName = 'DialogDetailConfig';

export default DialogDetailConfig;
