'use client';

import { useCloudDialog } from '@/shared/hooks/useCloudDialog';

import CloudDialog from './CloudDialog';

const DialogContainer = () => {
  const { dialogInfo } = useCloudDialog();

  return dialogInfo && <CloudDialog />;
};

export default DialogContainer;
