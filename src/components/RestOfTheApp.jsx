import {useAuthContext} from '../providers/AuthProvider';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

export const RestOfTheApp = () => {
  const {profile, logout} = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate('/');
    }
  }, [profile]);

  if (!profile) return null;

  return (
    <div>
      <h1>Página Principal</h1>

      <p>Nome: {profile.nome}</p>
      <p>Sobrenome: {profile.sobrenome}</p>
      <p>Data de Nascimento: {profile.dataNascimento}</p>

      <button
        onClick={() => {
          logout();
          navigate('/');
        }}
      >
        Logout
      </button>
    </div>
  );
};