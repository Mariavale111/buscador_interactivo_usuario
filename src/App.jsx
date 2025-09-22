import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "./components/SearchInput";
import Card from "./components/Card";
import { useAuth } from "./context/AuthContext";
export default function App() {
  const { logout } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const API_URL = "http://localhost:8000";

  const obtenerUsuarios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(response.data);
      setFiltrados(response.data);
    } catch (error) {
      console.log("Error al obtener los usuarios", error);
      setError("Error al obtener los usuarios");
      toast.error("Error al obtener los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const filtrarUsuarios = useCallback(
    (query) => {
      setLoading(true);
      const q = query.trim().toLowerCase();
      setTimeout(() => {
        const resultados = usuarios.filter((u) =>
          [u.nombre, u.apellidos, u.perfil, u.intereses, u.correo].some((campo) =>
            String(campo).toLowerCase().includes(q)
          )
        );
        setFiltrados(resultados);
        setLoading(false);
      }, 800); // delay para mostrar efecto
    },
    [usuarios]
  );

  const cerrarDetalle = () => setUsuarioSeleccionado(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-4">
      <button className="bg-red-500 text-white px-3 py-1 rounded float-right" onClick={logout}>
      LOGOUT
      </button>
      
      <h1 
      className="text-3xl font-bold text-center mb-4">Buscador de Usuarios</h1>

      <SearchInput onSearch={filtrarUsuarios} loading={loading} />

      {/* Spinner de carga */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Overlay con carta seleccionada */}
      {usuarioSeleccionado && !loading && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm z-40"
          onClick={cerrarDetalle}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl text-center relative max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-red-500 font-bold"
              onClick={cerrarDetalle}
            >
              ✖
            </button>
            <img
              src={usuarioSeleccionado.foto}
              alt={`${usuarioSeleccionado.nombre} ${usuarioSeleccionado.apellidos}`}  
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-blue-100 shadow-sm"
            />
            <h2 className="text-2xl font-bold">
              {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellidos}
            </h2>
            <p className="text-lg text-gray-700">{usuarioSeleccionado.perfil}</p>
            <p className="text-sm text-gray-500 italic">{usuarioSeleccionado.intereses}</p>
            <p className="text-sm text-blue-500 mt-2">{usuarioSeleccionado.correo}</p>
          </div>
        </div>
      )}

      {/* Lista de usuarios */}
      {!usuarioSeleccionado && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtrados.map((usuario) => (
            <Card
              key={usuario.id}
              usuario={usuario}
              onSelect={setUsuarioSeleccionado} 
            />
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
