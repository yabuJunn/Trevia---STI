import "./loginForm.css"

export const LoginForm = () => {
    return <>
        <form className="loginRegisterForm">
            <h2>Iniciar Sesión</h2>
            <div className="formGroup">
                <label htmlFor="email">Correo electronico</label>
                <input type="email" id="email" name="email" placeholder="Ingrese su email" required />
            </div>
            <div className="formGroup">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required />
            </div>
            <button type="submit">Iniciar Sesión</button>
            <p>¿No tienes una cuenta? <span>Regístrate aquí</span></p>
        </form>
    </>
}