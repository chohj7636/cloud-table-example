import React from 'react';

import DefaultSelect from '@/shared/components/DefaultSelect';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Provider } from '@/shared/types/types';

interface DialogBasicConfigProps {
  name: string;
  provider: Provider;
  setName: (name: string) => void;
  setProvider: (provider: Provider) => void;
}

const DialogBasicConfig: React.FC<DialogBasicConfigProps> = React.memo(
  ({ name, provider, setName, setProvider }) => {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };

    const handleProviderChange = (value: string) => {
      setProvider(value as Provider);
    };

    return (
      <div className="space-y-8">
        <h3 className="border-b py-2 pl-2 text-lg font-bold">기본 설정</h3>
        <div className="space-y-6 pl-4">
          <div className="flex flex-col gap-2">
            <Label className="text-[16px]">
              Cloud Name <span className="text-red-500">*</span>
            </Label>
            <Input value={name} onChange={handleNameChange} />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-[16px]">
              Provider <span className="text-red-500">*</span>
            </Label>
            <DefaultSelect
              className="w-full"
              options={[
                { label: 'AWS', value: 'AWS' },
                { label: 'Azure', value: 'AZURE', disabled: true },
                { label: 'GCP', value: 'GCP', disabled: true },
              ]}
              placeholder="Provider"
              value={provider}
              onValueChange={handleProviderChange}
            />
          </div>
        </div>
      </div>
    );
  },
);

DialogBasicConfig.displayName = 'DialogBasicConfig';

export default DialogBasicConfig;
