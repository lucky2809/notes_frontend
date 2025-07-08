import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/fromComp/Signup';
import Signin from './components/fromComp/Signin';
import Dashboard from './components/pages/Dashboard';
import OAuthSuccess from './components/fromComp/AuthSuccess';
import { AuthProvider } from './components/auth/AuthProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
