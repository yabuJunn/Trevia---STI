import './loginForm.css';

import { useState, type FormEvent } from 'react';
import { NavigationHook } from '../../../hooks/navigationHook';
import { loginUser } from '../../../services/supabase/supabaseLoginAuth';

export const LoginForm: React.FC = () => {
    const { handleNavigation } = NavigationHook();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const res = await loginUser({ email, password });
        setLoading(false);

        if (!res.success) {
            setError(res.message);
        } else {
            // redirige a dashboard u otra página
            handleNavigation.navigateToDashboard();
        }
    };

    return (
        <form className="loginRegisterForm" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>



            <div className="formGroup">
                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingrese su email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="formGroup">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            {error && <p id="errorRegister">{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>

            <p>
                ¿No tienes una cuenta?{' '}
                <span
                    className="link"
                    onClick={handleNavigation.navigateToRegister}
                >
                    Regístrate aquí
                </span>
            </p>
        </form>
    );
};
