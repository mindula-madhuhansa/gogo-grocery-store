import { axiosClient } from "@/lib/axios";

type Props = {
  email: string | undefined;
  password: string | undefined;
};

export const signInUser = ({ email, password }: Props) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });
