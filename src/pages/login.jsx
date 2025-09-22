import {useState} from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {

    const {login} = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        login(username, password)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 '>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md space-y-4'>
                <h2 className='text-lg font-semibold text-center'>LOGIN</h2>
                <input type="text" placeholder='Correo' onChange={(e) => setUsername(e.target.value)} value={username} className='border p-2 w-full'/>
                <input type="password" placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} value={password} className='border p-2 w-full'/>
                <button className="bg-blue-500 text-white p-2 rounded">Iniciar Sesión</button>
                </form>
            </div>
    )
}