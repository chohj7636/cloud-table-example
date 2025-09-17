'use client';

import { Cloud } from '@/app/api/types';
import { useCloudDialog } from '@/hooks/useCloudDialog';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';

interface CloudTableProps {
  data: Cloud[];
}

const columnHelper = createColumnHelper<Cloud>();

const CloudTable = ({ data }: CloudTableProps) => {
  // 다이얼로그 상태 관리 훅
  const { cloudDialog } = useCloudDialog();

  const handleEdit = (id: string) => {
    console.log('Edit cloud:', id);
    cloudDialog({
      type: 'edit',
      confirmButton: {
        text: '확인',
        clickEvent: () => {},
      },
    });
  };

  const handleDelete = (id: string) => {
    console.log('Delete cloud:', id);
  };

  const handleRowClick = (id: string) => {
    console.log('Row clicked:', id);
  };

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => (
        <span className="font-mono text-sm text-gray-600">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('provider', {
      header: 'Provider',
      cell: (info) => (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <span className="font-medium text-gray-900">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('cloudGroupName', {
      header: 'Cloud Group',
      cell: (info) => {
        const groups = info.getValue();
        return (
          <div className="flex flex-wrap gap-1">
            {groups?.map((group, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
              >
                {group}
              </span>
            )) || '-'}
          </div>
        );
      },
    }),
    columnHelper.accessor('eventProcessEnabled', {
      header: 'Event Process',
      cell: (info) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            info.getValue()
              ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset'
              : 'bg-red-50 text-red-700 ring-1 ring-red-600/20 ring-inset'
          }`}
        >
          {info.getValue() ? 'VALID' : 'INVALID'}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: '작업',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(info.row.original.id)}
            className="rounded p-1 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            aria-label="수정"
            tabIndex={0}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(info.row.original.id)}
            className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-700"
            aria-label="삭제"
            tabIndex={0}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">클라우드 관리</h1>
        <p className="mt-2 text-sm text-gray-600">
          등록된 클라우드 계정을 관리할 수 있습니다.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm whitespace-nowrap text-gray-900"
                    onClick={(e) => {
                      // 액션 버튼 클릭 시 row 클릭 이벤트 방지
                      if (cell.column.id === 'actions') {
                        e.stopPropagation();
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          등록된 클라우드 계정이 없습니다.
        </div>
      )}
    </div>
  );
};

export default CloudTable;
