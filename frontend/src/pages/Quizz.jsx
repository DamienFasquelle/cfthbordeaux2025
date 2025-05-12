import React from 'react';

const Quizz = () => {
  return (
    <div className="container text-center my-5">
      <h2>Quizz</h2>
      <p className="mb-4">Cliquez sur le bouton ci-dessous pour accéder au quiz :</p>
      
      <a 
        href="https://forms.gle/YOUR_GOOGLE_FORM_LINK" // Remplace par le lien de ton Google Form
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn text-white"  zstyle={{backgroundColor:'#592F2F'}}
      >
        Aller au Quiz
      </a>
    </div>
  );
};

export default Quizz;