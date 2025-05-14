import React from 'react';

const Presentation = () => {
  return (
    <section className="container my-3">
      <h2 className="text-center mb-5">Présentation</h2>
      <div className="card mb-5 shadow-lg border-0">
        <div className="card-header bg-primary rounded-top">
          <h3 className="text-center text-light">Les Présentations du CFTH</h3>
        </div>
        <div className="card-body bg-light text-primary rounded-bottom">
          <p>
            Toutes les présentations qui seront faites durant le CFTH seront publiées ici avec les détails de chaque événement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Presentation;