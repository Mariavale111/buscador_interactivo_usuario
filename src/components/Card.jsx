export default function Card({ usuario, onSelect }) {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow text-center cursor-pointer 
                 transition-all transform hover:scale-105 hover:shadow-xl"
      onClick={() => onSelect(usuario)}
    >
      <img
        src={usuario.foto}
        alt={`${usuario.nombre} ${usuario.apellidos}`}  
        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100 shadow-sm"
      />
      <h2 className="text-lg font-bold mt-3 text-gray-800 tracking-wide">
        {usuario.nombre}
      </h2>
      <p className="text-sm text-gray-600 mt-1">{usuario.perfil}</p>
      <p className="text-sm text-gray-500 italic">{usuario.intereses}</p>
      <p className="text-xs text-gray-400 mt-2">{usuario.correo}</p>
    </div>
  );
}