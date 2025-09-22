import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { CloudGroupNameList } from '@/shared/types/types';
import { Provider } from '@/shared/types/types';

interface DialogDetailConfigProps {
  provider: Provider | undefined;
  selectedCloudGroups: string[];
  setSelectedCloudGroups: (groups: string[]) => void;
  eventProcessEnabled: boolean;
  userActivityEnabled: boolean;
  cloudTrailName: string;
  setCloudTrailName: (name: string) => void;
  setEventProcessEnabled: (enabled: boolean) => void;
  setUserActivityEnabled: (enabled: boolean) => void;
}

const DialogDetailConfig = ({
  provider,
  selectedCloudGroups,
  setSelectedCloudGroups,
  eventProcessEnabled,
  userActivityEnabled,
  cloudTrailName,
  setCloudTrailName,
  setEventProcessEnabled,
  setUserActivityEnabled,
}: DialogDetailConfigProps) => {
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

  return (
    <div className="space-y-8">
      <h3 className="border-b py-2 text-lg font-bold">고급 설정</h3>
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
                  checked={selectedCloudGroups.includes(group)}
                  onChange={() => setSelectedCloudGroups([group])}
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
              onChange={(e) =>
                setEventProcessEnabled(e.target.checked as boolean)
              }
              className="h-4 w-4"
            />
            <Label htmlFor="eventProcess">Enable Event Process</Label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="userActivity"
              checked={userActivityEnabled}
              onChange={(e) =>
                setUserActivityEnabled(e.target.checked as boolean)
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
