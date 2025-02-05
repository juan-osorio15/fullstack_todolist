"use client";

import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const { id } = params;
  return (
    <div>
      <h1>You are in user {id} page </h1>
    </div>
  );
}
