import "./registerForm.css"

export const RegisterForm = () => {
    return <>
        <form className="loginRegisterForm">
            <h2>Registrarse</h2>
            <div className="formGroup">
                <label htmlFor="username">Nombre</label>
                <input type="text" id="username" name="username" placeholder="Ingrese su nombre" required />
            </div>
            <div className="formGroup">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Ingrese su email" required />
            </div>
            <div className="formGroup">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required />
            </div>
            <div className="formGroup">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirme su contraseña" required />
            </div>
            <button type="submit">Registrarse</button>
            <p>¿Ya tienes una cuenta? <span>Inicia sesión aquí</span></p>
        </form>
    </>
}