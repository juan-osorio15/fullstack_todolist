"use client";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/axiosClient";

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pwd: "",
    confirmPwd: "",
  });
  const [error, setError] = useState<string | null>(null);

  function handleFormInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (formData.pwd !== formData.confirmPwd) {
      setError("Passwords do not match");
      return;
    }

    try {
      await apiClient.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.pwd,
      });

      router.push("/login");
    } catch (err: unknown) {
      console.error("Signup Error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup error");
      }
    }
  }

  return (
    <form className="flex flex-col gap-3 text-black">
      <input
        type="text"
        name="username"
        id="usernameInput"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => {
          handleFormInput(e);
        }}
      />
      <input
        type="email"
        name="email"
        id="emailInput"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => {
          handleFormInput(e);
        }}
      />
      <input
        type="password"
        name="pwd"
        id="pwdInput"
        placeholder="Password"
        value={formData.pwd}
        onChange={(e) => {
          handleFormInput(e);
        }}
      />
      <input
        type="password"
        name="confirmPwd"
        id="confirmPwdInput"
        placeholder="Confirm password"
        value={formData.confirmPwd}
        onChange={(e) => {
          handleFormInput(e);
        }}
      />
      <button
        className="text-xl p-1 border-2 rounded-xl hover:bg-gray-800 text-white"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        submit
      </button>
      {error && <p className="text-red-800 bg-red-100 underline">{error}</p>}
    </form>
  );
}
