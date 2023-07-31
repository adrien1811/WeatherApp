import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navibar from './components/navbar/navibar.js';
import './index.css';
import Footer from './components/footer/footer.js';

const App = () => {
  return (
    <div className="Background">
      <Navibar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

// Add the ReactDOM.render here
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
