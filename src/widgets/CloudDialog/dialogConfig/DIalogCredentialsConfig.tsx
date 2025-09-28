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
            return [
              {
                label: 'Provider를 선택해주세요',
                value: 'none',
                disabled: true,
              },
            ];
        }
      };

      const handleCredentialTypeChange = (type: string) => {
        setCredentialType(
          type as AWSCredentialType | AzureCredentialType | GCPCredentialType,
        );
      };

      // 공통 onChange 핸들러
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateCredentials({ [name]: value });
      };

      const printCredentialComponent = (providerType: Provider) => {
        switch (providerType) {
          case 'AWS':
            return (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Label>
                    Access Key <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="accessKeyId"
                    value={(credentials as AWSCredential).accessKeyId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>
                    Secret Key <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="secretAccessKey"
                    value={(credentials as AWSCredential).secretAccessKey || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Role ARN</Label>
                  <Input
                    name="roleArn"
                    value={(credentials as AWSCredential).roleArn || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            );
          case 'AZURE':
            return (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Label>
                    Tenant ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="tenantId"
                    value={(credentials as AzureCredential).tenantId || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>
                    Subscription ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="subscriptionId"
                    value={
                      (credentials as AzureCredential).subscriptionId || ''
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>
                    Application ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="applicationId"
                    value={(credentials as AzureCredential).applicationId || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>
                    Secret Key <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="secretKey"
                    value={(credentials as AzureCredential).secretKey || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            );
          case 'GCP':
            return (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Label>
                    Project ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="projectId"
                    value={(credentials as GCPCredential).projectId || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>
                    JSON Text <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="jsonText"
                    value={(credentials as GCPCredential).jsonText || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            );

          default:
            return null;
        }
      };

      return (
        <div className="space-y-8">
          <h3 className="border-b py-2 pl-2 text-lg font-bold">인증</h3>
          <div className="space-y-6 pl-4">
            <div className="flex flex-col gap-2">
              <Label className="text-[16px]">
                Key Registration Method <span className="text-red-500">*</span>
              </Label>
              <DefaultSelect
                className="w-full"
                options={printCredentialType(provider)}
                placeholder="credentialType"
                value={credentialType}
                onValueChange={handleCredentialTypeChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="text-[16px]">
                Credentials <span className="text-red-500">*</span>
              </Label>
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
