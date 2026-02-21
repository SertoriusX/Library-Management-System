import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="row">
        {/* Sidebar / Navbar */}
        <div className="col-12 col-md-3 col-lg-2 p-0">
          <Navbar />
        </div>

        {/* Main content */}
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
