import React, { useState, useEffect } from 'react';

const Quizz = () => {
  // Les horaires d'accès pour chaque quiz (format 24h)
  const quizTimes = [
    { time: '8:00', date: '2025-05-23', link: 'https://docs.google.com/forms/d/e/1FAIpQLSc0fb1kHdiQSCtHiEmtJc4G0QqM1tADHcTp0_HfyVjqvdh3OQ/viewform?usp=dialog' },
    { time: '9:30', date: '2025-05-23', link: 'https://docs.google.com/forms/d/e/1FAIpQLSe4aGHYHcoyYX8SwMtYFPn1ZExJrHh9c5DOxGbFQDQo0u74Ew/viewform?usp=dialog' },
    { time: '12:00', date: '2025-05-23', link: 'https://docs.google.com/forms/d/e/1FAIpQLSc6Yv3llkDmQo32enWNHsAPJR3ukd3IM8TvPkWNAXWY8Rweuw/viewform?usp=dialog' },
  ];

  // État pour suivre les boutons activés
  const [activeLinks, setActiveLinks] = useState([false, false, false]);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const updatedActiveLinks = quizTimes.map(({ date, time }) => {
        const targetTime = new Date(`${date}T${time}:00`);
        return now >= targetTime;
      });
      setActiveLinks(updatedActiveLinks);
    };

    
    checkTime();

    const interval = setInterval(checkTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container my-3">
      <h2 className="text-center mb-5">Quizz</h2>
      <p className="mb-4">Cliquez sur le bouton ci-dessous pour accéder aux quiz :</p>
      
      {quizTimes.map(({ link }, index) => (
        <a
          key={index}
          href={activeLinks[index] ? link : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn text-white mb-3 w-100 ${activeLinks[index] ? '' : 'disabled'}`}
          style={{
            backgroundColor: activeLinks[index] ? '#592F2F' : '#ccc',
            cursor: activeLinks[index] ? 'pointer' : 'not-allowed',
            opacity: activeLinks[index] ? 1 : 0.7,
          }}
        >
          Quiz {index + 1}
        </a>
      ))}
    </section>
  );
};

export default Quizz;
