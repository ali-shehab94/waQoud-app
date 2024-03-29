import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/Landing/LandingPage';
import axios from 'axios';
import Login from './pages/Login/Login';
import AdminPanel from './pages/AdminPanel/AdminPanel';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin_panel' element={<AdminPanel />} />
            </Routes>
        </Router>
    );
}

export default App;
