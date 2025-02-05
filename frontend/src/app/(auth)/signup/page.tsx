import SignupForm from "../../../components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-7 h-screen">
      <h1 className="text-6xl font-semibold">Create your account</h1>
      <SignupForm />
    </div>
  );
}
