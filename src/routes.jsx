import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from './components/Login';
import {Register} from './components/Register';
import {RestOfTheApp} from './components/RestOfTheApp';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/home" element={<RestOfTheApp />} />
      </Routes>
    </BrowserRouter>
  );
};