import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import {
  AWSEventSource,
  AzureEventSource,
  CloudGroupNameList,
  GCPEventSource,
} from '@/shared/types/types';
import { Provider } from '@/shared/types/types';

const DialogDetailConfig = () => {
  // cloud zustand data
  const { cloudData, setCloudData } = useCloudDialog();

  const printEventSourceComponent = (providerType: Provider) => {
    switch (providerType) {
      case 'AWS':
        return (
          <div className="flex flex-col gap-2">
            <Label>CloudTrail Name</Label>
            <Input
              value={
                (cloudData.eventSource as AWSEventSource)?.cloudTrailName || ''
              }
              onChange={(e) =>
                setCloudData({
                  ...cloudData,
                  eventSource: {
                    cloudTrailName: e.target.value,
                  } as AWSEventSource,
                })
              }
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
                (cloudData.eventSource as AzureEventSource)
                  ?.storageAccountName || ''
              }
              onChange={(e) =>
                setCloudData({
                  ...cloudData,
                  eventSource: {
                    storageAccountName: e.target.value,
                  } as AzureEventSource,
                })
              }
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
                (cloudData.eventSource as GCPEventSource)?.storageAccountName ||
                ''
              }
              onChange={(e) =>
                setCloudData({
                  ...cloudData,
                  eventSource: {
                    storageAccountName: e.target.value,
                  } as GCPEventSource,
                })
              }
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
      <h3 className="border-b py-2 text-lg font-bold">고급 설정</h3>
      <div className="space-y-6 pl-4">
        {/* Event Integration */}
        {cloudData.provider && (
          <div className="flex flex-col gap-2">
            <Label>Event Integration</Label>
            {printEventSourceComponent(cloudData.provider)}
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
                  checked={cloudData.cloudGroupName?.includes(group) || false}
                  onChange={() => {
                    const currentGroups = cloudData.cloudGroupName || [];
                    const newGroups = currentGroups.includes(group)
                      ? currentGroups.filter((g) => g !== group)
                      : [...currentGroups, group];

                    setCloudData({
                      ...cloudData,
                      cloudGroupName: newGroups,
                    });
                  }}
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
              checked={cloudData.eventProcessEnabled}
              onChange={(e) =>
                setCloudData({
                  ...cloudData,
                  eventProcessEnabled: e.target.checked as boolean,
                })
              }
              className="h-4 w-4"
            />
            <Label htmlFor="eventProcess">Enable Event Process</Label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="userActivity"
              checked={cloudData.userActivityEnabled}
              onChange={(e) =>
                setCloudData({
                  ...cloudData,
                  userActivityEnabled: e.target.checked as boolean,
                })
              }
              className="h-4 w-4"
            />
            <Label htmlFor="userActivity">Enable User Activity</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogDetailConfig;
