import { redirect } from "next/navigation";
import LoginForm from "../../components/Login/loginForm/loginForm";
import { auth } from "../_lib/auth";

const Login = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");
  return <LoginForm />;
};

export default Login;
