import CloudTableContainer from '@/widgets/CloudTableContainer';
import PageHeader from '@/widgets/PageHeader';

export default async function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="클라우드 관리"
        description="등록된 클라우드 계정을 관리할 수 있습니다."
      />
      <CloudTableContainer />
    </div>
  );
}
