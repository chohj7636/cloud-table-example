import DefaultSelect from '@/shared/components/DefaultSelect';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Provider } from '@/shared/types/types';

interface DialogBasicConfigProps {
  provider: Provider | undefined;
  setProvider: (provider: Provider) => void;
}

const DialogBasicConfig = ({
  provider,
  setProvider,
}: DialogBasicConfigProps) => {
  return (
    <div className="space-y-8">
      <h3 className="border-b py-2 pl-2 text-lg font-bold">기본 설정</h3>
      <div className="space-y-6 pl-4">
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
      </div>
    </div>
  );
};

export default DialogBasicConfig;
