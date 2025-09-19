'use client';

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { CloudTable as CloudTableType } from '../api/type';

interface CloudTableProps {
  data: CloudTableType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<CloudTableType, any>[];
}

export const columnHelper = createColumnHelper<CloudTableType>();

const CloudTable = ({ data, columns }: CloudTableProps) => {
  const handleRowClick = (id: string) => {
    console.log('Row clicked:', id);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
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
