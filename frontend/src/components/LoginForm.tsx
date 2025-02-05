"use client";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/axiosClient";
import { LoginResponse } from "../../types/user";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
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

    try {
      const response: LoginResponse = await apiClient.post("/auth/login", {
        email: formData.email,
        password: formData.pwd,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      router.push(`/user/${user.id}`);
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
      <button
        className="text-xl p-1 border-2 rounded-xl hover:bg-gray-800 text-white"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        log in
      </button>
      {error && <p className="text-red-800 bg-red-100 underline">{error}</p>}
    </form>
  );
}
