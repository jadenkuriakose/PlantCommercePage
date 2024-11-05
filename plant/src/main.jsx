// src/main.jsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Purchase from './pages/Purchase';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <App />
        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/purchase" element = {<Purchase />} />
        </Routes>
    </Router>
);