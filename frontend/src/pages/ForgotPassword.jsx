import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('https://api.ddvportfolio.com/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erreur lors de l'envoi du token.");
    }

    const data = await res.json();
    const token = data.token;
    navigate(`/reset-password/${token}`);
  } catch (error) {
    setMessage(error.message);
  }
};


  return (
    <section className="container-fluid d-flex justify-content-center align-items-center bg-light p-5">
      <div className="card p-4 shadow-lg rounded-4" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-3" style={{ color: 'var(--cfth-dark)' }}>
          Mot de passe oublié
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn w-100" 
          style={{
            backgroundColor: 'var(--cfth-primary)',
            color: 'var(--cfth-white)',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease',
          }}>Envoyer</button>
        </form>
        {message && <div className="alert alert-warning mt-3 text-center">{message}</div>}
        <div className="text-center mt-3">
          <button className="btn btn-link" style={{ color: 'var(--cfth-primary)' }} onClick={() => navigate('/login')}>
            Retour à la connexion
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
