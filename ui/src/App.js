import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Applications from './pages/Applications';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Posted from './pages/Posted';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/jobdetail' element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/signup' element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/applications' element={<ProtectedRoute><Applications /></ProtectedRoute>} />
        <Route path='/postJob' element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path='/posted' element={<ProtectedRoute><Posted /></ProtectedRoute>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
