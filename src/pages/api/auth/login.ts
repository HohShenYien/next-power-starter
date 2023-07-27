import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = authSchema.parse(JSON.parse(req.body));
    console.log(data);
    if (data) {
      if (data.email === "hohshenyien@gmail.com" && data.password === "asdf") {
        res.status(200).json({ auth_token: "This is a JWT auth token" });
      } else {
        res
          .status(401)
          .json({ message: "Please use the default email & password" });
      }
    } else {
      res.status(400);
    }
  } else {
    res.status(405);
  }
};

export default handler;
