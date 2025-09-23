import React from 'react';

import DefaultSelect from '@/shared/components/DefaultSelect';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  AWSCredential,
  AWSCredentialType,
  AzureCredential,
  AzureCredentialType,
  GCPCredential,
  GCPCredentialType,
  Provider,
} from '@/shared/types/types';

interface DialogCredentialsConfigProps {
  provider: Provider;
  credentialType: AWSCredentialType | AzureCredentialType | GCPCredentialType;
  credentials: AWSCredential | AzureCredential | GCPCredential;
  setCredentialType: (
    type: AWSCredentialType | AzureCredentialType | GCPCredentialType,
  ) => void;
  updateCredentials: (
    credentials: Partial<AWSCredential | AzureCredential | GCPCredential>,
  ) => void;
}

const DialogCredentialsConfig: React.FC<DialogCredentialsConfigProps> =
  React.memo(
    ({
      provider,
      credentialType,
      credentials,
      setCredentialType,
      updateCredentials,
    }) => {
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

      const handleCredentialTypeChange = (type: string) => {
        setCredentialType(
          type as AWSCredentialType | AzureCredentialType | GCPCredentialType,
        );
      };

      const handleAccessKeyChange = (
        e: React.ChangeEvent<HTMLInputElement>,
      ) => {
        updateCredentials({ accessKeyId: e.target.value });
      };

      const handleSecretKeyChange = (
        e: React.ChangeEvent<HTMLInputElement>,
      ) => {
        updateCredentials({ secretAccessKey: e.target.value });
      };

      const handleRoleArnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCredentials({ roleArn: e.target.value });
      };

      const printCredentialComponent = (providerType: Provider) => {
        switch (providerType) {
          case 'AWS':
            return (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Label>Access Key *</Label>
                  <Input
                    value={(credentials as AWSCredential).accessKeyId}
                    onChange={handleAccessKeyChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Secret Key *</Label>
                  <Input
                    value={(credentials as AWSCredential).secretAccessKey || ''}
                    onChange={handleSecretKeyChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Role ARN</Label>
                  <Input
                    value={(credentials as AWSCredential).roleArn || ''}
                    onChange={handleRoleArnChange}
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
              {provider && (
                <DefaultSelect
                  className="w-full"
                  options={printCredentialType(provider)}
                  placeholder="credentialType"
                  value={credentialType}
                  onValueChange={handleCredentialTypeChange}
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
    },
  );

DialogCredentialsConfig.displayName = 'DialogCredentialsConfig';

export default DialogCredentialsConfig;
