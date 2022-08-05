import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/Landing/LandingPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
