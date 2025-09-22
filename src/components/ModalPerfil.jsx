export default function ModalPerfil({ usuario, onClose }) {
  if (!usuario) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <img
          className="w-28 h-28 rounded-full mx-auto border-4 border-blue-200 shadow-md"
          src={usuario.foto}
          alt="avatar"
        />
        <h2 className="text-2xl font-bold text-center mt-3 text-gray-800">{usuario.nombre}</h2>
        <p className="text-gray-600 text-center text-sm">{usuario.perfil}</p>

        <div className="mt-4 text-sm text-gray-700 space-y-2 text-center">
          <p className="italic text-gray-500">{usuario.intereses}</p>
          <p className="text-blue-600 font-medium">{usuario.correo}</p>
        </div>
      </div>
    </div>
  );
}
