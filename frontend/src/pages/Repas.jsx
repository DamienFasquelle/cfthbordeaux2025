import React from 'react';
import repasJeudi from '../assets/image/other/Affiche.png';  
import repasVendredi from '../assets/image/other/Affiche.png';  

const Repas = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Repas</h2>

      {/* Section pour le repas du jeudi soir */}
      <div className="container bg-light p-4 rounded shadow-sm mb-5">
        <h3 className="">Jeudi Soir</h3>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={repasJeudi} className="img-fluid rounded mb-3" alt="Repas du Jeudi Soir" />
          </div>
          <div className="col-md-6">
            <h4 className="text-dark">Menu</h4>
            <ul className="list-unstyled">
              <li><strong>Entrée :</strong> </li>
              <li><strong>Plat :</strong> </li>
              <li><strong>Dessert :</strong> </li>
            </ul>
            <h5 className="mt-4">Adresse</h5>
            <p>Restaurant ..., Bordeaux</p>
          </div>
        </div>
      </div>

      {/* Section pour le repas du vendredi midi */}
      <div className="container bg-light p-4 rounded shadow-sm">
        <h3 className="">Vendredi Midi</h3>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={repasVendredi} className="img-fluid rounded mb-3" alt="Repas du Vendredi Midi" />
          </div>
          <div className="col-md-6">
            <h4 className="text-dark">Menu</h4>
            <ul className="list-unstyled">
              <li><strong>Entrée :</strong> </li>
              <li><strong>Plat :</strong> </li>
              <li><strong>Dessert :</strong> </li>
            </ul>
            <h5 className="mt-4">Adresse</h5>
            <p>Restaurant ..., Bordeaux</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repas;
