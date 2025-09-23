import { Skeleton } from '@/shared/components/ui/skeleton';

const DialogSkeleton = () => {
  return (
    <div className="flex h-full flex-col space-y-3">
      <Skeleton className="h-10 w-2/3 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    </div>
  );
};

export default DialogSkeleton;
