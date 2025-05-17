import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const VosPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.error('Erreur lors du décodage du token:', error);
            setUser(null);
        }
    }
}, []);


    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('https://api.ddvportfolio.com/api/photos');
                if (!response.ok) throw new Error('Erreur lors de la récupération des photos');
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error(error);
                setErrorMessage('Une erreur est survenue lors du chargement des photos.');
            }
        };
        fetchPhotos();
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

const handlePublishPhotos = async () => {
  if (!user) {
    setErrorMessage('Vous devez être connecté pour publier des photos.');
    return;
  }

  if (selectedFiles.length === 0) {
    setErrorMessage('Veuillez sélectionner au moins une image.');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    setErrorMessage('Token manquant, veuillez vous reconnecter.');
    return;
  }

  // Log du token pour débogage (à supprimer en production)
  console.log("Token utilisé:", token)
  const formData = new FormData();
  selectedFiles.forEach((file) => formData.append('images[]', file));

  try {
    // Utilisation de l'en-tête Authorization avec le token JWT
    const response = await fetch('https://api.ddvportfolio.com/api/upload-photo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Ne pas ajouter Content-Type avec FormData
      },
      body: formData,
      credentials: 'same-origin',
      mode: 'cors'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Erreur API:', response.status, errorData);
      throw new Error(`Erreur ${response.status}: ${errorData?.error || 'Échec du téléchargement'}`);
    }

    const result = await response.json();
    console.log('Réponse API:', result);

    setSuccessMessage('Images publiées avec succès !');
    setSelectedFiles([]);

    // Rafraîchir les photos après téléchargement
    const updatedPhotosResponse = await fetch('https://api.ddvportfolio.com/api/photos');
    if (!updatedPhotosResponse.ok) {
      console.error('Erreur lors de la récupération des photos:', updatedPhotosResponse.status);
      throw new Error('Erreur lors de la récupération des photos mises à jour.');
    }
    
    const updatedPhotos = await updatedPhotosResponse.json();
    setPhotos(updatedPhotos);

    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (error) {
    console.error('Erreur complète:', error);
    setErrorMessage(error.message || 'Une erreur est survenue lors du téléchargement des images.');
    setTimeout(() => setErrorMessage(''), 5000);
  }
};


    const openModal = (index) => {
        setCurrentPhotoIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((currentPhotoIndex + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((currentPhotoIndex - 1 + photos.length) % photos.length);
    };

    return (
        <section className="container my-3">
            <h2 className="text-center mb-5">Galerie Photos</h2>
            {!user ? (
                <div className="bg-primary text-center text-white p-3 rounded mb-4">
                    Vous devez être <button className="btn btn-link text-white p-0 fw-semibold" onClick={() => navigate('/login')} style={{ textDecoration: "underline" }}>connecté</button> pour publier des photos.
                </div>
            ) : (
                <div className="mb-4">
                    <button onClick={handleFileSelect} className="btn text-white mb-3 w-100" style={{ backgroundColor: 'var(--cfth-primary)' }}>
                        Choisir des images
                    </button>
                    <div className="d-flex flex-wrap">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="position-relative m-2">
                                <img src={URL.createObjectURL(file)} alt="Preview" className="rounded" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                <button className="btn btn-danger btn-sm position-absolute" style={{ top: 0, right: 0 }} onClick={() => handleRemoveFile(index)}>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <input type="file" multiple accept="image/*" ref={fileInputRef} className="d-none" onChange={handleFileChange} />
                    <button onClick={handlePublishPhotos} className="btn text-white w-100" style={{ backgroundColor: 'var(--cfth-primary)' }} disabled={selectedFiles.length === 0}>
                        Publier
                    </button>
                </div>
            )}
            <div className="row">
                {photos.map((photo, index) => (
                    <div key={photo.id} className="col-6 col-sm-4 col-md-3 mb-4">
                        <img src={`https://api.ddvportfolio.com/uploads/photos/${photo.filename}`} alt="Uploaded" className="img-fluid rounded shadow-sm mb-1" onClick={() => openModal(index)} style={{ cursor: 'pointer' }} />
                         <div className="text-center mt-2 text-muted" style={{ fontSize: '10px' }}>
                            Publié par : {photo.username}
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="modal fade show d-block" onClick={closeModal}>
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content position-relative">
                            <button type="button" className="btn-close position-absolute top-0 end-0 m-2" onClick={closeModal}></button>
                            <button onClick={prevPhoto} className="btn btn-light position-absolute top-50 start-0 translate-middle-y" style={{ zIndex: 1 }}>&#8249;</button>
                            <img src={`https://api.ddvportfolio.com/uploads/photos/${photos[currentPhotoIndex].filename}`} alt="Uploaded" className="img-fluid rounded" />
                            <button onClick={nextPhoto} className="btn btn-light position-absolute top-50 end-0 translate-middle-y" style={{ zIndex: 1 }}>&#8250;</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VosPhotos;
