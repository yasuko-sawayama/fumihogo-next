import { useFetchUser } from "lib/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PageContent from "./PageContent";
import { Page } from "../../models/product";

type AuthContentProps = {
  pageIds: string[];
};

const AuthContent = ({ pageIds }: AuthContentProps) => {
  const { user, loading } = useFetchUser();
  const [pageLoading, setPageLoading] = useState(false);
  const [pageData, setPageData] = useState<Page | undefined>();
  const router = useRouter();
  const { page } = router.query;

  const id = page ? Number(page) - 1 : 0;

  const fetchData = async () => {
    setPageLoading(true);
    // ページはidで取得するためcontentful上では一意に特定できる
    const data = await fetch(`/api/page/${pageIds[id]}`);

    setPageData(await data.json());
    setPageLoading(false);
  };

  useEffect(() => {
    if (!user) return;

    fetchData();
  }, [user, id]);

  if (loading) return <div>Loading</div>;
  if (!user) return <div>このコンテンツは表示できません。</div>;
  if (pageLoading) return <div>読み込み中です</div>;
  if (!pageData) return <div>データがありません。</div>;

  return <PageContent {...pageData} />;
};

export default AuthContent;
