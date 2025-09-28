'use client';

import { useCallback, useMemo } from 'react';

import { createCloudTableColumns } from '@/features/cloudTable/cloudList/config/columns';
import { useCloudTable } from '@/features/cloudTable/cloudList/hooks/useCloudTable';
import CloudTable from '@/features/cloudTable/cloudList/ui/CloudTable';
import TableSkeleton from '@/shared/components/skeleton/TableSkeleton';
import { Button } from '@/shared/components/ui/button';
import { useCloudDialog } from '@/shared/hooks/useCloudDialog';

const CloudTableContainer = () => {
  // 클라우드 테이블 데이터
  const { cloudTableData, isCloudTableLoading } = useCloudTable();

  // 다이얼로그 상태 관리 훅
  const { cloudDialog } = useCloudDialog();

  const handleEdit = useCallback(
    (id: string) => {
      cloudDialog({
        type: 'edit',
        editCloudId: id,
        confirmButton: {
          text: '수정',
        },
      });
    },
    [cloudDialog],
  );

  const handleCreate = useCallback(() => {
    cloudDialog({
      type: 'create',
      confirmButton: {
        text: '생성',
      },
    });
  }, [cloudDialog]);

  const handleDelete = useCallback((id: string) => {
    console.log('Delete cloud:', id);
  }, []);

  const columns = useMemo(
    () => createCloudTableColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end">
        <Button onClick={handleCreate}>클라우드 생성</Button>
      </div>
      {isCloudTableLoading ? (
        <TableSkeleton />
      ) : (
        <CloudTable data={cloudTableData || []} columns={columns} />
      )}
    </div>
  );
};

export default CloudTableContainer;
