import { useFetchUser } from "lib/user";
import { useState, useEffect } from "react";
import PageContent from "./PageContent";

type AuthContentProps = {
  pageId: string;
};

const AuthContent = ({ pageId }: AuthContentProps) => {
  const { user, loading } = useFetchUser();
  const [pageData, setPageData] = useState();

  const fetchData = async () => {
    const data = await fetch(`/api/page/${pageId}`);

    setPageData(await data.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading</div>;

  if (!user) return <div>このコンテンツは表示できません。</div>;

  if (!pageData) return <div>データがありません。</div>;

  return <PageContent {...pageData} />;
};

export default AuthContent;
