import { User } from "@/features/Auth/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.headers.authorization) {
    res.status(200).json({
      email: "hohshenyien@gmail.com",
      username: "Shen Yien",
    });
  }
  res.status(401);
};

export default handler;
