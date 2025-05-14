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
    <header>
      <nav className="navbar p-0 m-0">
        <div
          className="container-fluid d-flex justify-content-between align-items-center"
          style={{ maxWidth: '1200px', margin: 'auto' }}
        >
          <button
            className="navbar-toggler order-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ width: '50px', marginRight: '10px', marginLeft: '10px' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Titre au centre avec un espace réduit */}
          <h1 className="fs-4 mb-0 order-2 title" style={{width: '30%', textAlign: 'center'}}>
            CFTH <br className="d-sm-block d-none" /> Bordeaux
          </h1>

          {/* Logo à droite avec une petite marge */}
          <Link to="/" className="navbar-brand order-3 ms-1">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100px', height: 'auto' }} />
          </Link>
        </div>

        <div className="collapse navbar-collapse mb-2" id="navbarNav">
          <ul className="navbar-nav flex-row justify-content-center flex-wrap gap-1 mt-2">
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
