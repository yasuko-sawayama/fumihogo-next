import auth0 from "../../../lib/auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPage } from "lib/api";

export default async function getPageById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await auth0.getSession(req);

  if (!user) {
    return res.status(401).end("unauthorized");
  }

  // ページはIDで取得するためContentful上では一意に特定できる
  const pageId = req.query.id;
  const data = await getPage(pageId);

  if (!data) return res.status(404).end("page not found");

  res.status(200).json(data);
}
