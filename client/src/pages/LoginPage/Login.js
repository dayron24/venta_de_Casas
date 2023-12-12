import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Verifica si la contraseña es correcta (puedes comparar con una contraseña predefinida)
    if (password === 'C4s4s2024') {
      // Guarda el estado de autenticación en localStorage
      localStorage.setItem('isAdminAuthenticated', 'true');
      // Redirige al administrador a la página de subirCasa
      navigate('/subirCasa');
    } else {
      // Actualiza el estado del mensaje de error
      setErrorMessage('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión como admin</button>
    </div>
  );
};

export default LoginPage;
