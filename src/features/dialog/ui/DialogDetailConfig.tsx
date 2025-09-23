import React from 'react';

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
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

    const handleEventProcessToggle = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setEventProcessEnabled(e.target.checked);
    };

    const handleUserActivityToggle = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setUserActivityEnabled(e.target.checked);
    };

    const printEventSourceComponent = (providerType: Provider) => {
      switch (providerType) {
        case 'AWS':
          return (
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
      <div className="space-y-8">
        <h3 className="border-b py-2 pl-2 text-lg font-bold">고급 설정</h3>
        <div className="space-y-6 pl-4">
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
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="eventProcess"
                checked={eventProcessEnabled}
                onChange={handleEventProcessToggle}
                className="h-4 w-4"
              />
              <Label htmlFor="eventProcess">Enable Event Process</Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="userActivity"
                checked={userActivityEnabled}
                onChange={handleUserActivityToggle}
                className="h-4 w-4"
              />
              <Label htmlFor="userActivity">Enable User Activity</Label>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

DialogDetailConfig.displayName = 'DialogDetailConfig';

export default DialogDetailConfig;
