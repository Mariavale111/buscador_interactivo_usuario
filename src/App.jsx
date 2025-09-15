import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "./components/Searchinput";
import Card from "./components/Card";


export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 

  const API_URL = 'http://localhost:8000'


  const obtenerUsuarios = async () => {
    try{
      const response = await axios.get(`${API_URL}/usuarios`)
      setUsuarios(response.data)
      setFiltrados(response.data)
    } catch (error) {
      console.log('Error al obtener los usuarios', error)
      setError('Error al obtener los usuarios')
      toast.error('Error al obtener los usuarios')
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  
  }, [])

 const filtrarUsuarios = useCallback(
  (query) => {
    const q = query.trim().toLowerCase()
    const resultados = usuarios.filter((u) =>
      [u.nombre, u.apellidos, u.perfil, u.intereses, u.correo].some((campo) =>
        String(campo).toLowerCase().includes(q)
      )
    )

    setFiltrados(resultados)
  },
  [usuarios]
)

return (
  <div className="min-h-screen bg-gray-100 p-8 space-y-4">
    <h1 className="text-3xl font-bold text-center mb-4">
      buscador de Usuarios
    </h1>

    <SearchInput onSearch={filtrarUsuarios} />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtrados.map((usuario) => (
        <Card key={usuario.id} usuario={usuario} />
      ))}
    </div>
  </div>
)
}