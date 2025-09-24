import { Skeleton } from '@/shared/components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className="flex w-full flex-col space-y-3">
      <Skeleton className="h-7 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
};

export default TableSkeleton;
