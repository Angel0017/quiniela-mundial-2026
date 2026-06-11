import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 text-black">
          🏆 Quiniela Mundial 2026
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Compite con tus amigos y demuestra quién sabe más de fútbol.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/registro"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Registrarse
          </Link>

          <Link
            href="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </main>
  );
}