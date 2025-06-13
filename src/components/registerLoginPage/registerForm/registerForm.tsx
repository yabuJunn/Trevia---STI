import './registerForm.css';

import { useState, type FormEvent } from 'react';
import { NavigationHook } from '../../../hooks/navigationHook';
import { registerUser } from '../../../services/supabase/supabaseRegister';

export const RegisterForm: React.FC = () => {
    const { handleNavigation } = NavigationHook();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirm) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        const res = await registerUser({ name: username, email, password });
        setLoading(false);

        if (!res.success) {
            setError(res.message);
        } else {
            setSuccess(res.message);
            // opcional: redirigir a otra pantalla
        }
    };

    return (
        <form className="loginRegisterForm" onSubmit={handleSubmit}>
            <h2>Registrarse</h2>

            <div className="formGroup">
                <label htmlFor="username">Nombre</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Ingrese su nombre"
                    required
                />
            </div>

            <div className="formGroup">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Ingrese su email"
                    required
                />
            </div>

            <div className="formGroup">
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    required
                />
            </div>

            <div className="formGroup">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Confirme su contraseña"
                    required
                />
            </div>

            {error && <p id="errorRegister">{error}</p>}

            {success && <p id="successRegister">{success}</p>}


            <button type="submit" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrarse'}
            </button>

            <p>
                ¿Ya tienes una cuenta? <span onClick={handleNavigation.navigateToLogin}>Inicia sesión aquí</span>
            </p>
        </form>
    );
};