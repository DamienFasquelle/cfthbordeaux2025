import React from 'react';
import abbott from '../assets/image/logo/abbott.png';
import beckman from '../assets/image/logo/beckman.png';
import biocynex from '../assets/image/logo/biocynex.png';
import cfth from '../assets/image/logo/cfth.jpg';
import chu from '../assets/image/logo/chu.png';
import sysmex from '../assets/image/logo/sysmex.png';
import tago from '../assets/image/logo/tago.png';
import werfen from '../assets/image/logo/werfen.jpg';
import cacolac from '../assets/image/logo/cacolac.png';
import jock from '../assets/image/logo/MaisonJock.jpg';
import haemonetics from '../assets/image/logo/haemonetics.jpg';
import roche from '../assets/image/logo/roche.png';

const Footer = () => {
  const logos = [abbott, beckman, biocynex, cfth, chu, sysmex, tago, werfen, cacolac, jock, haemonetics, roche];

  return (
    <footer className="text-dark py-4">
      <hr />
      <div className="container">
        {/* Section Contact */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5 className='text-primary'>Contact</h5>
            <ul className="list-unstyled text-start">
              <li><strong>Email :</strong> <a href="mailto:secretariat.cfth@outlook.fr">secretariat.cfth@outlook.fr</a></li>
              <li><strong>Téléphone :</strong> <a href="tel:+33660332058">06 60 33 20 58</a></li>
              <li><strong>Adresse :</strong> 159 boulevard Voltaire, 75011 Paris, France</li>
            </ul>
          </div>

          {/* Section Grille des partenaires */}
          <div className="col-md-6">
            <h5>Nos Partenaires</h5>
            <div className="row ">
              {logos.map((logo, index) => (
                <div className="col-4 mb-3" key={index}>
                  <img src={logo} className="img-fluid" alt="Partenaire" />
                </div>
              ))}
            </div>
          </div>
          
        </div>
        <div className="text-center mt-8">
          <p className="text-cfth-muted">&copy; 2025 CFTH. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;