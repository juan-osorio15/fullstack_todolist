import LoginForm from "../../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-7 h-screen">
      <h1 className="text-6xl font-semibold">Access your account</h1>
      <LoginForm />
    </div>
  );
}
