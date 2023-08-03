import { User } from "@/features/Auth/types";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse<User | string>) => {
  const token = getCookie("token", { req, res });

  if (token === "ThisIsSecretCookie") {
    res.status(200).json({
      email: "hohshenyien@gmail.com",
      username: "Shen Yien",
    });
  }
  res.status(401).json("");
};

export default handler;
