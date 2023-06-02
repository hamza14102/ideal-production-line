import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './componenets/Home';
import P1 from './componenets/P1';
import P2 from './componenets/P2';
import Navigation from './componenets/Navigation';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/P1" element={<P1 />} />
          <Route path="/P2" element={<P2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;