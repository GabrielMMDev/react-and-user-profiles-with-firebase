import {useState} from 'react';
import {useAuthContext} from '../providers/AuthProvider';
import {useNavigate} from 'react-router-dom';

export const Register = () => {
  const {register, authErrorMessages} = useAuthContext();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    const success = await register(email, password, nome, sobrenome, dataNascimento);

    if (success) {
      navigate('/');
    } else {
      setErrorMessage('Erro ao cadastrar usuário');
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>

      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <br />

      <input placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
      <br />

      <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
      <br />

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={handleRegister}>Cadastrar</button>

      <br /><br />

      <button onClick={() => navigate('/')}>
        Voltar para login
      </button>

      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      {authErrorMessages?.map((err, i) => (
        <p key={i} style={{color: 'red'}}>{err}</p>
      ))}
    </div>
  );
};