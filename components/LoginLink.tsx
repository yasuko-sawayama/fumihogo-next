import Link from "next/link";
import { useFetchUser } from "../lib/user";

export default function LoginLink() {
  const { user, loading } = useFetchUser();

  if (loading) return <a>loading...</a>;

  if (!user) {
    return (
      <Link href="/api/login" passHref>
        <a className="inline-flex items-center bg-scarlet-600 border-0 py-1 px-3 focus:outline-none hover:bg-scarlet-300 hover:text-gray-800 rounded text-white text-base mt-4 md:mt-0">
          ログイン
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </Link>
    );
  }

  return (
    <>
      {user.nickname}
      <Link href="/api/logout" passHref>
        <a className="inline-flex items-center text-gray-800 border border-scarlet-500 py-1 px-3 focus:outline-none hover:bg-gray-100 rounded text-base mt-4 ml-4 md:mt-0">
          ログアウト
        </a>
      </Link>
    </>
  );
}
