import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const data = { email, username, password };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Échec de l'inscription. Vérifiez vos informations.");
      }

      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="container-fluid d-flex justify-content-center align-items-center bg-light p-4">
      <div className="card p-4 shadow-lg rounded-4 border-0" style={{ maxWidth: '420px', width: '100%' }}>
        <button
          className="btn btn-sm mb-3"
          onClick={() => navigate(-1)}
          style={{
            color: 'var(--cfth-primary)',
            borderColor: 'var(--cfth-primary)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          ← Retour
        </button>

        <h2 className="text-center mb-4" style={{ color: 'var(--cfth-dark)' }}>Inscription</h2>

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

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nom et prénom</label>
            <input
              type="text"
              className="form-control rounded-3"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom et prénom"
              required
              style={{ fontSize: '14px' }}
            />
          </div>

          <div className="mb-4">
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
          </div>

          {error && <div className="alert alert-danger text-center">{error}</div>}
          {success && <div className="alert alert-success text-center">Inscription réussie ! Redirection...</div>}

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
            S'inscrire
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
