import React from 'react';

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { AWSRegionList, Provider } from '@/shared/types/types';

interface DialogRegionOrNetworkProps {
  provider: Provider;
  regionList: string[];
  proxyUrl: string | undefined;
  setRegionList: (regions: string[]) => void;
  setProxyUrl: (url: string | undefined) => void;
}

const DialogRegionOrNetwork: React.FC<DialogRegionOrNetworkProps> = React.memo(
  ({ provider, regionList, proxyUrl, setRegionList, setProxyUrl }) => {
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

    const handleRegionChange = (regionValue: string) => {
      setRegionList([regionValue]);
    };

    const handleProxyUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProxyUrl(e.target.value);
    };

    return (
      <div className="space-y-8">
        <h3 className="border-b py-2 pl-2 text-lg font-bold">
          지역 및 네트워크
        </h3>
        <div className="space-y-6 pl-4">
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
                      checked={regionList.includes(region.value)}
                      onChange={() => handleRegionChange(region.value)}
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
              value={proxyUrl || ''}
              onChange={handleProxyUrlChange}
              placeholder="Enter proxy URL (optional)"
            />
          </div>
        </div>
      </div>
    );
  },
);

DialogRegionOrNetwork.displayName = 'DialogRegionOrNetwork';

export default DialogRegionOrNetwork;
