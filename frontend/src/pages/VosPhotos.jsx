import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const VosPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error('Erreur de décodage du token:', error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, [navigate]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/photos');
                if (!response.ok) throw new Error('Erreur lors de la récupération des photos');
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error(error);
                setSuccessMessage('Une erreur est survenue lors du chargement des photos.');
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
            setSuccessMessage('Vous devez être connecté pour publier des photos.');
            return;
        }

        if (selectedFiles.length === 0) {
            setSuccessMessage('Veuillez sélectionner au moins une image.');
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('images[]', file));

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload-photo', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Erreur lors du téléchargement des images.');

            setSuccessMessage('Images publiées avec succès !');
            setSelectedFiles([]);
            const updatedPhotos = await (await fetch('http://127.0.0.1:8000/api/photos')).json();
            setPhotos(updatedPhotos);

            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setSuccessMessage('Une erreur est survenue lors du téléchargement des images.');
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
            {successMessage && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded shadow-lg">
                    {successMessage}
                </div>
            )}
            {!user ? (
                <div className="alert alert-warning text-center">
                    Vous devez être <button className="btn btn-link p-0" onClick={() => navigate('/login')}>connecté</button> pour publier des photos.
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
                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}
                    <input type="file" multiple accept="image/*" ref={fileInputRef} className="d-none" onChange={handleFileChange} />
                    <button onClick={handlePublishPhotos} className="btn text-white w-100" style={{ backgroundColor: 'var(--cfth-primary)' }} disabled={selectedFiles.length === 0}>
                        Publier
                    </button>
                </div>
            )} <div className="gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <div key={photo.id} onClick={() => openModal(index)} className="cursor-pointer relative mb-3">
                        <img src={`http://127.0.0.1:8000/uploads/photos/${photo.filename}`} alt="Uploaded" className="img-fluid rounded shadow-sm mb-1" />
                        <div className="text-center mt-2 text-muted" style={{ fontSize: '15px' }}>
                            Publié par : {photo.username}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
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
                            position: "relative",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={`http://127.0.0.1:8000/uploads/photos/${photos[currentPhotoIndex].filename}`}
                            alt="Uploaded"
                            style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
                        />
                        <button
                            onClick={closeModal}
                            style={{
                                position: "absolute",
                                top: "2px",
                                right: "2px",
                                background: "none",
                                border: "none",
                                fontSize: "2rem",
                                color: "dark",
                                cursor: "pointer",
                            }}
                        >
                            ✕
                        </button>

                        {/* Boutons de navigation */}
                        {photos.length > 1 && (
                            <>
                                <button
                                    onClick={prevPhoto}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "15px",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        fontSize: "2.5rem",
                                        padding: "0 2px",
                                        color: "dark",
                                        cursor: "pointer",
                                    }}
                                >
                                    ❮
                                </button>
                                <button
                                    onClick={nextPhoto}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "15px",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                         border: "none",
                                        fontSize: "2.5rem",
                                        padding: "0 2px",
                                        color: "dark",
                                        cursor: "pointer",
                                    }}
                                >
                                    ❯
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default VosPhotos;
