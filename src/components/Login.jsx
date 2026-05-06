import {useState} from 'react';
import {useAuthContext} from '../providers/AuthProvider';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
  const {login, authErrorMessages} = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const handleButtonClick = async () => {
    let success = await login(email, password);

    if (success) {
      navigate('/home');
    } else {
      setErrorMessage('Usuário ou senha inválidos');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={handleButtonClick}>Entrar</button>

      <br /><br />

      <button onClick={() => navigate('/cadastro')}>
        Criar conta
      </button>

      {(errorMessage || authErrorMessages) && (
        <>
          <p style={{color: 'red'}}>{errorMessage}</p>
          {authErrorMessages?.map((err, i) => (
            <p key={i} style={{color: 'red'}}>{err}</p>
          ))}
        </>
      )}
    </div>
  );
};