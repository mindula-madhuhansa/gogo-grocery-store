import { axiosClient } from "@/lib/axios";

type Props = {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

export const registerUser = ({ username, email, password }: Props) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });
