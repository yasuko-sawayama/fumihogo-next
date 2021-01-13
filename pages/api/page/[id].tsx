import type { NextApiRequest, NextApiResponse } from "next";
import { getPage } from "lib/api";

export default async function getPageById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pageId = req.query.id;
  const data = await getPage(pageId);

  res.status(200).json(data);
}
