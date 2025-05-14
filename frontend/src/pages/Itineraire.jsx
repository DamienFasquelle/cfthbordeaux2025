import React from 'react';
import gare from '../assets/image/other/gare.jpg';
import aeroport from '../assets/image/other/aeroport.jpg';

const Itineraire = () => {
  return (
    <section className="container my-3">
      <h2 className="text-center mb-5">Itinéraires</h2>


<div className="card mb-5 shadow-lg border-0">
        <div className="card-header bg-primary rounded-top">
          <h3 className="text-center text-light">Moyens de Transport Recommandés</h3>
        </div>
        <div className="card-body bg-light text-primary rounded-bottom">
          <ul className="list-unstyled mb-4" style={{ gap: '15px', display: 'flex', flexDirection: 'column' }}>
            <li><strong>Bus Privé :</strong> RDV 7h15 Pont du Guit, sortie côté Belcier de la gare St Jean</li>
            <li><strong>Bus :</strong> Lignes 39-77-1</li>
            <li><strong>Tram B :</strong> Arrêt Pessac Alouette</li>
            <li><strong>Train :</strong> Gare de Pessac Alouette - Ligne F41</li>
            <li><strong>Horaires :</strong> Départs de Bordeaux St Jean direction Arcachon : 7H03 - 7h33 - 8h03</li>
            <li><strong>Signalétique :</strong> Prévue pour guider depuis Gare de Pessac Alouette jusqu’à l'IMS</li>
          </ul>
        </div>
      </div>
      {/* Itinéraire depuis la gare */}
      <div className="card mb-5 shadow-lg border-0">
        <div className="card-header bg-primary rounded-top">
          <h3 className="text-center text-light">Depuis la Gare Saint Jean (Bordeaux)</h3>
        </div>
        <div className="card-body bg-light text-primary rounded-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img src={gare} className="img-fluid rounded shadow-sm" alt="Gare Saint Jean" />
            </div>
            <div className="col-md-6">
              {/* <h4 className="mb-3">Trajet en Tram</h4>
              <p>
                Gare Saint Jean (Bordeaux) <br />
                Prenez le tram C direction Parc des Expositions (Bordeaux) <br />
                Descente Porte de Bourgogne <br />
                Traversez et prenez le tram A direction Le Haillan Rostand (Mérignac) <br />
                Descendre dans 12 arrêts à François Mitterrand
              </p> */}
              <a href="https://maps.app.goo.gl/VzEfSS4Wc8xoEH3f7" target="_blank" rel="noopener noreferrer" className="btn text-white mb-4" style={{ backgroundColor: '#592F2F' }}>
                Voir l'itinéraire sur Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Itinéraire depuis l'aéroport */}
      <div className="card mb-5 shadow-lg border-0">
        <div className="card-header bg-primary rounded-top">
          <h3 className="text-center text-light">Depuis l'Aéroport de Mérignac</h3>
        </div>
        <div className="card-body bg-light text-primary rounded-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img src={aeroport} className="img-fluid rounded shadow-sm" alt="Aéroport de Mérignac" />
            </div>
            <div className="col-md-6">
              {/* <h4 className="mb-3">Trajet en Tram</h4>
              <p>
                Prenez le tram A direction Floirac Dravemont (Floirac) <br />
                Descendre dans 10 arrêts à François Mitterrand
              </p> */}
              <a href="https://maps.app.goo.gl/o317pLUFYPqQxtnu8" target="_blank" rel="noopener noreferrer" className="btn text-white mb-4" style={{ backgroundColor: '#592F2F' }}>
                Voir l'itinéraire sur Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bus Privé et Autres Transports */}
      
    </section>
  );
};

export default Itineraire;
