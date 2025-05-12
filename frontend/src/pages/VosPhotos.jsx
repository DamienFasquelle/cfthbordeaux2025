import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const PhotoUpload = () => {
    const [photosByUser, setPhotosByUser] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [user, setUser] = useState(null);
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
                const groupedPhotos = {};
                data.forEach(photo => {
                    if (!groupedPhotos[photo.user]) groupedPhotos[photo.user] = [];
                    groupedPhotos[photo.user].push(photo);
                });
                setPhotosByUser(groupedPhotos);
            } catch (error) {
                console.error(error);
                alert('Une erreur est survenue lors du chargement des photos.');
            }
        };
        fetchPhotos();
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (selectedFiles.length + files.length > 5) {
            alert('Vous ne pouvez sélectionner que 5 fichiers maximum.');
            return;
        }
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

    const handleAddPhotos = async () => {
        if (!user) {
            alert('Vous devez être connecté pour publier des photos.');
            return;
        }

        if (selectedFiles.length === 0) {
            alert('Veuillez sélectionner au moins une image.');
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

            if (!response.ok) throw new Error('Erreur lors de l\'upload des images.');

            alert('Images uploadées avec succès !');
            setSelectedFiles([]);
            const updatedPhotos = await (await fetch('http://127.0.0.1:8000/api/photos')).json();
            const groupedPhotos = {};
            updatedPhotos.forEach(photo => {
                if (!groupedPhotos[photo.user]) groupedPhotos[photo.user] = [];
                groupedPhotos[photo.user].push(photo);
            });
            setPhotosByUser(groupedPhotos);
        } catch (error) {
            console.error(error);
            alert('Une erreur est survenue lors de l\'upload des images.');
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Vos Photos</h2>
            {!user ? (
                <div className="alert alert-warning text-center">
                    Vous devez être <button className="btn btn-link p-0" onClick={() => navigate('/login')}>connecté</button> pour publier des photos.
                </div>
            ) : (
                <div className="mb-4">
                    <button onClick={handleFileSelect} className="btn text-white mb-3 w-100" style={{ backgroundColor: 'var(--cfth-primary)' }} disabled={selectedFiles.length >= 5}>
                        {selectedFiles.length < 5 ? 'Choisir des images' : 'Limite atteinte (5 max)'}
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
                    <input type="file" multiple accept="image/*" ref={fileInputRef} className="d-none" onChange={handleFileChange} />
                    <button onClick={handleAddPhotos} className="btn text-white w-100" style={{ backgroundColor: 'var(--cfth-primary)' }} disabled={selectedFiles.length === 0}>
                        Ajouter les photos
                    </button>
                </div>
            )}

            <div className="users-container">
                {Object.entries(photosByUser).map(([userId, userPhotos]) => (
                    <div key={userId} className="user-photo-group mb-5">
                        <h3 className="username">Photos de {userPhotos[0].username}</h3>
                        <Swiper spaceBetween={10} slidesPerView={'auto'} className="photo-swiper">
                            {userPhotos.map(photo => (
                                <SwiperSlide key={photo.id} style={{ width: '80%' }}>
                                    <img src={`http://127.0.0.1:8000/uploads/photos/${photo.filename}`} alt="Uploaded" className="img-fluid rounded shadow-sm" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoUpload;
