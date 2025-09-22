import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "./components/Searchinput";
import Card from "./components/Card";
import ModalPerfil from "./components/ModalPerfil"; // 👈 Importa el modal

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false); // 👈 agrega esto


  const API_URL = "http://localhost:8000";

  const obtenerUsuarios = async () => {
    try {
      setLoading(true); // 🔵 cuando empieza
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(response.data);
      setFiltrados(response.data);
    } catch (error) {
      setError("Error al obtener los usuarios");
      toast.error("Error al obtener los usuarios");
    } finally {
      setLoading(false); // 🔴 cuando termina
    }
  };


  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const filtrarUsuarios = useCallback(
    (query) => {
      setLoading(true); // 👈 empieza búsqueda
      const q = query.trim().toLowerCase();
      const resultados = usuarios.filter((u) =>
        [u.nombre, u.apellidos, u.perfil, u.intereses, u.correo].some((campo) =>
          String(campo).toLowerCase().includes(q)
        )
      );
      setFiltrados(resultados);
      setTimeout(() => setLoading(false), 400); // 👈 pequeño delay para UX
    },
    [usuarios]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Buscador de Usuarios
      </h1>

      <SearchInput onSearch={filtrarUsuarios} />

      {/* 👇 Aquí acoplamos el loader */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtrados.map((usuario) => (
            <Card
              key={usuario.id}
              usuario={usuario}
              onClick={setUsuarioSeleccionado}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ModalPerfil
        usuario={usuarioSeleccionado}
        onClose={() => setUsuarioSeleccionado(null)}
      />
    </div>
  );
}