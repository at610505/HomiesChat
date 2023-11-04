import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import PrivateRoutes from './Components/PrivateRoutes';
import { AuthProvider } from './utils/AuthContext';

import Room from './pages/Room';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

function App() {

  return (
  
      <Router basename={import.meta.env.DEV ? '/' : '/HomiesChat/'}>
        <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/" element={<Room/>}/>
          </Route>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<LogIn/>}/>
        </Routes>
        </AuthProvider>
        </Router>
  )
}

export default App
