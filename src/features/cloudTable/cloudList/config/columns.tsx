import { Edit, Trash2 } from 'lucide-react';

import { columnHelper } from '../ui/CloudTable';

/**
 * CloudTable 컴포넌트에서 사용할 칼럼 정의
 *
 * @param handleEdit - 수정 버튼 클릭 핸들러
 * @param handleDelete - 삭제 버튼 클릭 핸들러
 * @returns 테이블 칼럼 배열
 */

export const createCloudTableColumns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
) => [
  columnHelper.accessor('provider', {
    header: 'Provider',
    cell: (info) => {
      const provider = info.getValue();
      const getProviderStyle = (provider: string) => {
        switch (provider) {
          case 'AWS':
            return 'bg-orange-50 text-orange-700 ring-orange-600/20';
          case 'AZURE':
            return 'bg-blue-50 text-blue-700 ring-blue-600/20';
          case 'GCP':
            return 'bg-red-50 text-red-700 ring-red-600/20';
          default:
            return 'bg-gray-50 text-gray-700 ring-gray-600/20';
        }
      };

      return (
        <span
          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getProviderStyle(provider)}`}
        >
          {provider}
        </span>
      );
    },
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
        {info.getValue() ? 'ENABLED' : 'DISABLED'}
      </span>
    ),
  }),
  columnHelper.accessor('userActivityEnabled', {
    header: 'User Activity',
    cell: (info) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          info.getValue()
            ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 ring-inset'
            : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 ring-inset'
        }`}
      >
        {info.getValue() ? 'ENABLED' : 'DISABLED'}
      </span>
    ),
  }),
  columnHelper.accessor('regionList', {
    header: 'Regions',
    cell: (info) => {
      const regions = info.getValue();
      return (
        <div className="flex max-w-48 flex-wrap gap-1">
          {regions.slice(0, 2).map((region, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-600/20 ring-inset"
            >
              {region}
            </span>
          ))}
          {regions.length > 2 && (
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/20 ring-inset">
              +{regions.length - 2}
            </span>
          )}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleEdit(info.row.original.id)}
          className="cursor-pointer rounded p-1 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          aria-label="수정"
          tabIndex={0}
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => handleDelete(info.row.original.id)}
          className="cursor-pointer rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-700"
          aria-label="삭제"
          tabIndex={0}
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }),
];
