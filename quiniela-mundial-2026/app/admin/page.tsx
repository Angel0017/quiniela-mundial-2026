"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const ADMINS = ["admin"];

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      if (loading) return;

      if (!user || !ADMINS.includes(user.username)) {
        router.push("/");
        return;
      }

      const { data: usuariosDB } = await supabase
        .from("users")
        .select("username");

      const { data: prediccionesDB } = await supabase
        .from("predictions")
        .select("username,stage");

      const usuariosConEstado =
        (usuariosDB || []).map((u) => {
          const entregoGrupos =
            prediccionesDB?.some(
              (p) =>
                p.username === u.username &&
                p.stage === "grupos"
            ) || false;

          return {
            username: u.username,
            grupos: entregoGrupos,
          };
        });

      setUsuarios(usuariosConEstado);
      setCargando(false);
    };

    cargarDatos();
  }, [user, loading, router]);

  if (loading || cargando) {
    return (
      <div className="p-10 text-center">
        Cargando...
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        🔧 Panel Admin
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          👥 Usuarios
        </h2>

        <div className="space-y-3">
          {usuarios.map((usuario) => (
            <div
              key={usuario.username}
              className="flex justify-between border p-4 rounded-lg"
            >
              <span>
                {usuario.username}
              </span>

              <span>
                {usuario.grupos
                  ? "✅ Entregó grupos"
                  : "❌ Pendiente"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}