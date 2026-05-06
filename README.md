Sistema de Autenticação com Firebase (React)
Descrição

Aplicação em React com autenticação via Firebase e armazenamento de dados no Firestore.

Funcionalidades

Cadastro

Cria usuário com e-mail e senha no Firebase Authentication
Salva no Firestore: uid, nome, sobrenome, dataNascimento e email

Login

Valida credenciais no Firebase
Exibe erro se inválido

Página Principal

Mostra nome, sobrenome e data de nascimento do usuário logado
Configuração

Criar um projeto no Firebase e ativar:

Authentication (Email/Senha)
Firestore Database

Preencher:

firebaseConfig.json
{
  "apiKey": "SUA_KEY",
  "authDomain": "SEU_PROJETO.firebaseapp.com",
  "projectId": "SEU_PROJETO",
  "storageBucket": "SEU_PROJETO.appspot.com",
  "messagingSenderId": "XXX",
  "appId": "XXX"
}
Observação

Se aparecer erro de permissão no Firestore:

allow read, write: if true;

Execução
npm install
npm run dev