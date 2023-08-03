import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  setCookie("token", "ThisIsSecretCookie", {
    req,
    res,
    httpOnly: true,
    sameSite: true,
    maxAge: -1,
  });
  res.status(200).json({ message: "Logout Successfully" });
}
