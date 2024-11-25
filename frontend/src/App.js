// library imports
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//local imports
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { setUser } from './features/UserSlice';
import ProtectedRoute from './components/ProtectedRoute';
import { isEmptyObject } from './utils/helpers';

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.UserSlice)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            {/* Public Routes */}
            <Route path='/login' element={isEmptyObject(user) ? <Login /> : <Navigate to="/" />} />
            <Route path='/signup' element={isEmptyObject(user) ? <Signup /> : <Navigate to="/" />} />
            {/* Redirect unmatched routes */}
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
