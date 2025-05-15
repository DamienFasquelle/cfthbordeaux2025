import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginSuccess = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Erreur de connexion. Vérifiez vos identifiants.');

      const result = await response.json();
      localStorage.setItem('token', result.token);
      handleLoginSuccess();
    } catch (error) {
      setError('Erreur serveur. Veuillez réessayer plus tard.');
    }
  };

  return (
    <section className="container-fluid d-flex justify-content-center align-items-center bg-light p-4">
      <div className="card shadow-lg p-4 rounded-4 border-0" style={{ maxWidth: '420px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: 'var(--cfth-dark)' }}>Connexion</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
              style={{ fontSize: '14px' }}
            />
          </div>

          <div className="mb-4 position-relative">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control rounded-3"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
                style={{ fontSize: '14px' }}
              />
             <button
                type="button"
                className="btn border-0"
                style={{ cursor: 'pointer' }}
                onClick={togglePasswordVisibility}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: 'var(--cfth-primary)', fontSize: '15px' }}></i>
              </button>
            </div>
              <div className="text-end">
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              style={{ color: 'var(--cfth-secondary)' }}
              onClick={() => navigate('/forgot-password')}
            >
              Mot de passe oublié ?
            </button>
          </div>
          </div>

         

          {error && <div className="alert alert-danger text-center">{error}</div>}

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: 'var(--cfth-primary)',
              color: 'var(--cfth-white)',
              fontWeight: 'bold',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Se connecter
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="mb-2" style={{ color: 'var(--cfth-muted)', fontSize: '14px' }}>
            Pas encore inscrit ?
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => navigate('/signin')}
            style={{
              color: 'var(--cfth-primary)',
              borderColor: 'var(--cfth-primary)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Créer un compte
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;