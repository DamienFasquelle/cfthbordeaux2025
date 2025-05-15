import React, { useState } from 'react';
import affiche from '../assets/image/other/Affiche.png';
import Programme from '../assets/image/other/Programme.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentImage, setCurrentImage] = useState(""); 

  const slideStyle = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const images = [
    {
      src: affiche,
      alt: "Affiche événement",
      legend: "Découvrez l'affiche officielle de l'événement.",
    },
    {
      src: Programme,
      alt: "Programme de l'événement",
      legend: "Consultez le programme pour ne rien manquer.",
    },
  ];

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <div className="container my-5">
      {/* Titre principal */}
      <h2 className="text-center mb-4 fw-bold">
        Bienvenue au CFTH 2025 Bordeaux
      </h2>

      {/* Description */}
      <p className="text-center fs-5 mb-5 text-muted">
        Découvrez tout ce que le <strong>CFTH Bordeaux 2025</strong> a à offrir : un événement riche en découvertes, en partage et en apprentissages autour des métiers de la santé. Parcourez notre programme complet, explorez les itinéraires, et préparez-vous à vivre une expérience inoubliable.
      </p>

      {/* Carousel */}
      <div className="carousel-container mx-auto" style={{ maxWidth: "800px" }}>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          className="shadow rounded"
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                className="carousel-arrow carousel-arrow-left btn btn-sm btn-primary"
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  left: "10px",
                  padding: "5px 10px",
                  fontSize: "16px",
                }}
                aria-label="Previous slide"
              >
                ‹
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                className="carousel-arrow carousel-arrow-right btn btn-sm btn-primary"
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  right: "10px",
                  padding: "5px 10px",
                  fontSize: "16px",
                }}
                aria-label="Next slide"
              >
                ›
              </button>
            )
          }
        >
          {/* Slides */}
          {images.map((image, index) => (
            <div key={index} onClick={() => handleImageClick(image.src)} style={{ cursor: "pointer" }}>
              <img src={image.src} alt={image.alt} style={slideStyle} />
            </div>
          ))}

          {/* Map Slide */}
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.113197313747!2d-0.6587252229675254!3d44.79888167107077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd54d9130ed3b7e9%3A0xe607cf8428dc77eb!2sInstitut%20des%20M%C3%A9tiers%20de%20la%20Sant%C3%A9%20(IMS)!5e0!3m2!1sfr!2sfr!4v1747302113299!5m2!1sfr!2sfr"
              style={{
                width: "100%",
                height: "400px",
                border: "none",
                borderRadius: "10px",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map CFTH"
              className='m-0'
            />
          </div>
        </Carousel>
      </div>

      {/* Modal pour image agrandie */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={currentImage}
              alt="Agrandissement"
              style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
