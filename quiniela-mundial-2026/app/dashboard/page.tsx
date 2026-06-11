"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">
        Bienvenido, {user.username}
      </h1>

      <p className="text-gray-600 mb-8">
        Ya estás dentro de la Quiniela Mundial 2026.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/grupos"
          className="bg-blue-600 text-white p-6 rounded-xl text-center hover:bg-blue-700"
        >
          📋 Fase de Grupos
        </Link>

        <Link
          href="/ranking"
          className="bg-yellow-500 text-white p-6 rounded-xl text-center hover:bg-yellow-600"
        >
          🏆 Ranking
        </Link>
      </div>

      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="mt-8 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </main>
  );
}