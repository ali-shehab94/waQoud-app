import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Landing/LandingPage';

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
