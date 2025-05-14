import React from 'react';

const Quizz = () => {
  return (
    <section className="container my-3">
            <h2 className="text-center mb-5">Quizz</h2>
      <p className="mb-4">Cliquez sur le bouton ci-dessous pour accéder au quiz :</p>
      
      <a 
        href="https://forms.gle/YOUR_GOOGLE_FORM_LINK"
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn text-white"  zstyle={{backgroundColor:'#592F2F'}}
      >
        Aller au Quiz
      </a>
    </section>
  );
};

export default Quizz;