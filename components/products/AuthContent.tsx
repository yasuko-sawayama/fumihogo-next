import { useFetchUser } from "lib/user";
import { useState, useEffect } from "react";
import PageContent from "./PageContent";
import { Page } from "../../models/product";

type AuthContentProps = {
  pageId: string;
};

const AuthContent = ({ pageId }: AuthContentProps) => {
  const { user, loading } = useFetchUser();
  const [pageData, setPageData] = useState<Page | undefined>();

  const fetchData = async () => {
    // ページはidで取得するためcontentful上では一意に特定できる
    const data = await fetch(`/api/page/${pageId}`);

    setPageData(await data.json());
  };

  useEffect(() => {
    if (!user) return;

    fetchData();
  }, [user]);

  if (loading) return <div>Loading</div>;

  if (!user) return <div>このコンテンツは表示できません。</div>;

  if (!pageData) return <div>データがありません。</div>;

  return <PageContent {...pageData} />;
};

export default AuthContent;
