import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateFlashcard from './pages/CreateFlashcard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
          <Route path="/create-flashcard" element={<CreateFlashcard />} />
        </Route>
      </Routes>
      <Toaster /> {/* Place Toaster at the bottom of your app */}
    </Router>
  );
};

export default App;
