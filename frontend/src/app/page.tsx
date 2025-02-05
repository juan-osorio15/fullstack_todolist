import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-7 h-screen">
      <h1 className="text-center text-9xl font-bold mb-10 border-b-2">
        Organiza tus tareas
      </h1>
      <button className="text-3xl p-3 border-2 rounded-xl hover:bg-gray-800">
        <Link href="/signup">Crear una cuenta</Link>
      </button>
      <button className="text-3xl p-3 border-2 rounded-xl hover:bg-gray-800">
        <Link href="/login">Acceder a mi cuenta</Link>
      </button>
    </div>
  );
}
