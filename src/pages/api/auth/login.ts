import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) => {
  if (req.method === "POST") {
    const data = authSchema.parse(JSON.parse(req.body));
    if (data) {
      if (data.email === "hohshenyien@gmail.com" && data.password === "asdf") {
        setCookie("token", "ThisIsSecretCookie", {
          req,
          res,
          httpOnly: true,
          sameSite: true,
          maxAge: 60 * 60 * 24,
        });
        res.status(200).json({ message: "Login successfully" });
      } else {
        res
          .status(401)
          .json({ message: "Please use the default email & password" });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ message: "Only POST request is supported" });
  }
};

export default handler;
