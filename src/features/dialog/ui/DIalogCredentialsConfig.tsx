import DefaultSelect from '@/shared/components/DefaultSelect';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useCloudDialog } from '@/shared/hooks/useCloudDialog';
import {
  AWSCredential,
  AWSCredentialType,
  AzureCredentialType,
  GCPCredentialType,
  Provider,
} from '@/shared/types/types';

const DialogCredentialsConfig = () => {
  // cloud zustand data
  const { cloudData, setCloudData } = useCloudDialog();

  const printCredentialType = (providerType: Provider) => {
    switch (providerType) {
      case 'AWS':
        return [
          { label: 'Access Key', value: 'ACCESS_KEY' as AWSCredentialType },
          {
            label: 'Assume Role',
            value: 'ASSUME_ROLE' as AWSCredentialType,
            disabled: true,
          },
          {
            label: 'Roles Anywhere',
            value: 'ROLES_ANYWHERE' as AWSCredentialType,
            disabled: true,
          },
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
              <Input
                value={(cloudData.credentials as AWSCredential).accessKeyId}
                onChange={(e) =>
                  setCloudData({
                    ...cloudData,
                    credentials: {
                      ...cloudData.credentials,
                      accessKeyId: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Secret Key *</Label>
              <Input
                value={
                  (cloudData.credentials as AWSCredential).secretAccessKey || ''
                }
                onChange={(e) =>
                  setCloudData({
                    ...cloudData,
                    credentials: {
                      ...cloudData.credentials,
                      secretAccessKey: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Role ARN</Label>
              <Input
                value={(cloudData.credentials as AWSCredential).roleArn || ''}
                onChange={(e) =>
                  setCloudData({
                    ...cloudData,
                    credentials: {
                      ...cloudData.credentials,
                      roleArn: e.target.value,
                    },
                  })
                }
              />
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
          {cloudData.provider && (
            <DefaultSelect
              className="w-full"
              options={printCredentialType(cloudData.provider)}
              placeholder="credentialType"
              value={cloudData.credentialType}
              onValueChange={(type) =>
                setCloudData({
                  ...cloudData,
                  credentialType: type as
                    | AWSCredentialType
                    | AzureCredentialType
                    | GCPCredentialType,
                })
              }
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label className="text-[16px]">Credentials *</Label>
          <div className="pl-4">
            {cloudData.provider && printCredentialComponent(cloudData.provider)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogCredentialsConfig;
