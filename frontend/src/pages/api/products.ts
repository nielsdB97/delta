// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { statSync, createReadStream } from "fs";
import { join } from "path";
import type { NextApiRequest, NextApiResponse } from "next";

interface Product {
  id: string;
  title: string;
  price: string;
  tags: string[];
}
type Data = Product[];

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = join(__dirname, "..", "..", "..", "..", "products.json");
  const stat = statSync(filePath);

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": stat.size,
  });

  const readStream = createReadStream(filePath);
  readStream.pipe(res);
}
