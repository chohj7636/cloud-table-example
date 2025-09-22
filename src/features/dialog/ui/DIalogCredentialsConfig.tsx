import DefaultSelect from '@/shared/components/DefaultSelect';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Provider } from '@/shared/types/types';

interface DialogCredentialsConfigProps {
  provider: Provider | undefined;
  credentialType: string | undefined;
  setCredentialType: (credentialType: string) => void;
}

const DialogCredentialsConfig = ({
  provider,
  credentialType,
  setCredentialType,
}: DialogCredentialsConfigProps) => {
  const printCredentialType = (providerType: Provider) => {
    switch (providerType) {
      case 'AWS':
        return [
          { label: 'Access Key', value: 'ACCESS_KEY' },
          { label: 'Assume Role', value: 'ASSUME_ROLE', disabled: true },
          { label: 'Roles Anywhere', value: 'ROLES_ANYWHERE', disabled: true },
        ];
      case 'AZURE':
        return [{ label: 'Application', value: 'APPLICATION' }];
      case 'GCP':
        return [{ label: 'JSON Text', value: 'JSON_TEXT' }];

      default:
        return [];
    }
  };

  const printCredentialComponent = (providerType: Provider) => {
    switch (providerType) {
      case 'AWS':
        return (
          <div className="space-y-6">
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
  return (
    <div className="space-y-8">
      <h3 className="border-b py-2 pl-2 text-lg font-bold">인증</h3>
      <div className="space-y-6 pl-4">
        <div className="flex flex-col gap-2">
          <Label className="text-[16px]">Key Registration Method *</Label>
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
        <div className="flex flex-col gap-4">
          <Label className="text-[16px]">Credentials *</Label>
          <div className="pl-4">
            {provider && printCredentialComponent(provider)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogCredentialsConfig;
