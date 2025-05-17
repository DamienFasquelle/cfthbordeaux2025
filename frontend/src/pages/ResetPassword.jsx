import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch(`https://api.ddvportfolio.com/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!res.ok) throw new Error("Erreur lors de la réinitialisation.");
      setMessage("Mot de passe mis à jour avec succès !");
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="container-fluid d-flex justify-content-center align-items-center bg-light p-5">
      <div className="card p-4 shadow-lg rounded-4" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-3" style={{ color: 'var(--cfth-dark)' }}>
          Réinitialiser le mot de passe
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn bg-primary text-white w-100">
            Réinitialiser
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
        {message && <div className="alert alert-success mt-3 text-center">{message}</div>}
        <div className="text-center mt-3">
          <button className="btn btn-link text-dark" onClick={() => navigate('/login')}>
            Retour à la connexion
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
