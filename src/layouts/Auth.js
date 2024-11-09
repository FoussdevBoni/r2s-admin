import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'views/Login';

function Auth(props) {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />}>

      </Route>
    </Routes>
  );
}

export default Auth;