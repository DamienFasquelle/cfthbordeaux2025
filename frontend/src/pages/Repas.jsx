import React from 'react';
import repasJeudi from '../assets/image/other/repas/cafe/cafe.webp';  
import repasVendredi from '../assets/image/other/repas/schoolbus/bus.jpg';  

const Repas = () => {
  return (
    <section className="container my-3">
      <h2 className="text-center mb-5">Repas</h2>

      {/* Repas du jeudi soir */}
      <div className="card mb-5 shadow-lg border-0">
        <div className="card-header bg-primary rounded-top">
          <h3 className="text-center text-light">Jeudi Soir</h3>
        </div>
        <div className="card-body bg-light text-primary rounded-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img src={repasJeudi} className="img-fluid rounded shadow-sm" alt="Repas du Jeudi Soir" />
            </div>
            <div className="col-md-6">
              <h4 className="mb-3">Menu</h4>
              <ul className="list-unstyled mb-4" style={{ gap: '15px', display: 'flex', flexDirection: 'column' }}>
                <li><strong>Entrée :</strong> Terrine de canard</li>
                <li><strong>Plat :</strong> Suprême de volaille et risotto</li>
                <li><strong>Dessert :</strong> Moelleux au chocolat avec sorbet framboise</li>
              </ul>
              <h5 className="mb-2">Site web</h5>
              <p className="mb-3">
                <a 
                  href="https://www.lecafeduport.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary"
                >
                  www.lecafeduport.com
                </a>
              </p>
              <h5 className="mb-2">Téléphone</h5>
              <p className="mb-3">
                <a href="tel:+33556778118" className="text-primary">05 56 77 81 18</a>
              </p>
              <h5 className="mb-2">Adresse</h5>
              <p className="mb-3">
                Café du Port, 1 Quai Deschamps, 33100 Bordeaux
              </p>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5658.368754825129!2d-0.5611123229659478!3d44.83817837107073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5526320ac42e31%3A0x414cca4ece802d4a!2sLe%20Caf%C3%A9%20du%20Port!5e0!3m2!1sfr!2sfr!4v1747233759513!5m2!1sfr!2sfr" 
                width="100%" 
                height="300" 
                style={{ border: '0', borderRadius: '10px', marginBottom: '15px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Repas du vendredi midi */}
      <div className="card mb-5 shadow-lg border-0">
        <div className="card-header bg-primary rounded-top">
          <h3 className="text-center text-light">Vendredi Midi</h3>
        </div>
        <div className="card-body bg-light text-primary rounded-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img src={repasVendredi} className="img-fluid rounded shadow-sm" alt="Repas du Vendredi Midi" />
            </div>
            <div className="col-md-6">
              <h4 className="mb-3">Menu Food Truck</h4>
              <p><em>Choix unique : soit le menu normal, soit le menu végétarien</em></p>
              <h5>Menu Normal</h5>
              <ul className="list-unstyled mb-4" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                <li><strong>Entrée :</strong> ½ wrap jambon</li>
                <li><strong>Plat :</strong> Tradi-Burger + frites maison</li>
                <li><strong>Dessert :</strong> Maxi cookie aux pépites de chocolat</li>
              </ul>
              <h5>Menu Végétarien</h5>
              <ul className="list-unstyled" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                <li><strong>Entrée :</strong> ½ wrap végétarien</li>
                <li><strong>Plat :</strong> VG-Burger + frites maison</li>
                <li><strong>Dessert :</strong> Crêpe caramel beurre salé</li>
              </ul>
              <p><strong>Boisson :</strong> Petite bouteille d’eau ou canette de soft</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Repas;
