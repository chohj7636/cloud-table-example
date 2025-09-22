import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import { AWSRegionList, Provider } from '@/shared/types/types';

const DialogRegionOrNetwork = () => {
  // cloud zustand data
  const { cloudData, setCloudData } = useCloudDialog();

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

  return (
    <div className="space-y-8">
      <h3 className="border-b py-2 pl-2 text-lg font-bold">지역 및 네트워크</h3>
      <div className="space-y-6 pl-4">
        {/* Region List */}
        {cloudData.provider && (
          <div className="flex flex-col gap-2">
            <Label className="text-[16px]">Regions *</Label>
            <div className="grid grid-cols-3 gap-2 rounded-md border p-3">
              {getRegionsByProvider(cloudData.provider).map((region) => (
                <label
                  key={region.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Input
                    type="checkbox"
                    checked={cloudData.regionList.includes(region.value)}
                    onChange={() =>
                      setCloudData({ ...cloudData, regionList: [region.value] })
                    }
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
            value={cloudData.proxyUrl || ''}
            onChange={(e) =>
              setCloudData({ ...cloudData, proxyUrl: e.target.value })
            }
            placeholder="Enter proxy URL (optional)"
          />
        </div>
      </div>
    </div>
  );
};

export default DialogRegionOrNetwork;
