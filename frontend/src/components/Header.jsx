import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/image/logo/logo_cfth-min.png';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="">
      <nav className="navbar">
        <div
          className="container-fluid d-flex justify-content-between align-items-center"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <button
            className="navbar-toggler order-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <h1 className="fs-1 mb-0 text-nowrap order-2">CFTH Bordeaux</h1>

          <Link to="/" className="navbar-brand order-3 ms-1">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100px', height: 'auto' }} />
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <hr />
          <ul className="navbar-nav flex-row justify-content-center flex-wrap gap-2 mt-2">
            <li className="nav-item">
              <Link to="/repas" className={`nav-link ${isActive('/repas') ? 'active' : ''}`}>
                Repas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/itineraire" className={`nav-link ${isActive('/itineraire') ? 'active' : ''}`}>
                Itinéraires
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/presentation" className={`nav-link ${isActive('/presentation') ? 'active' : ''}`}>
                Présentation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quizz" className={`nav-link ${isActive('/quizz') ? 'active' : ''}`}>
                Quizz
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vos-photos" className={`nav-link ${isActive('/vos-photos') ? 'active' : ''}`}>
                Vos Photos
              </Link>
            </li>

            <li className="nav-item">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="btn btn-danger px-3 py-1 ms-2">
                  Déconnexion
                </button>
              ) : (
                <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>
                  Connexion
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
