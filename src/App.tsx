import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ConfiguracionUsuario from './components/ConfiguracionUsuario';
import PanelPrincipal from './components/PanelPrincipal';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/configuracion" 
          element={
            <PrivateRoute>
              <ConfiguracionUsuario />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/panel" 
          element={
            <PrivateRoute>
              <PanelPrincipal />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;