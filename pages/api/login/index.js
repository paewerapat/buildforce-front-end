import * as bcrypt from "bcrypt";
import { axiosQL } from "../../../lib/axios";

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;
    const { data } = await axiosQL.post(
      "",
      {
        query: `query userByEmailOrUsername($email: String, $username: String) { 
        userByEmailOrUsername(email: $email, username: $username) { 
          id, email, password
        } 
      }`,
        variables: {
          email: email,
        },
      },
      {
        headers: {
          "Apollo-Require-Preflight": "true",
          "Content-Type": "application/json",
        },
      }
    );

    const { userByEmailOrUsername } = data.data;

    if (
      userByEmailOrUsername &&
      (await bcrypt.compare(password, userByEmailOrUsername.password))
    ) {
      const { password, ...userWithoutPass } = userByEmailOrUsername;
      return res.status(200).json(userWithoutPass);
    } else return res.status(400).json({ msg: "Email or Password is invalid" });
  } catch (error) {
    console.log("[login-err] catch - ", error);
    return res.status(500).json({
      msg: error.messages,
    });
  }
}
