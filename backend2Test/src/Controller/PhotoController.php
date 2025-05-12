<?php
namespace App\Controller;

use App\Entity\Photo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security as SecurityBundleSecurity;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api')]
class PhotoController extends AbstractController
{
    #[Route('/upload-photo', name: 'api_upload_photo', methods: ['POST'])]
public function uploadPhoto(
    Request $request,
    SluggerInterface $slugger,
    EntityManagerInterface $em,
    SecurityBundleSecurity $security
): JsonResponse {
    // Récupérer tous les fichiers image envoyés sous 'images[]'
    $files = $request->files->get('images');

    // Vérifier qu'au moins un fichier a été envoyé
    if (!$files || count($files) === 0) {
        return new JsonResponse(['error' => 'Aucun fichier reçu.'], Response::HTTP_BAD_REQUEST);
    }

    $uploadedFiles = [];

    // Traiter chaque fichier
    foreach ($files as $file) {
        // Générer un nom de fichier unique pour chaque fichier
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        // Déplacer le fichier dans le répertoire public/uploads/photos
        $file->move(
            $this->getParameter('kernel.project_dir') . '/public/uploads/photos',
            $newFilename
        );

        // Créer une nouvelle entité Photo
        $photo = new Photo();
        $photo->setImage($newFilename);

        // Si l'utilisateur est connecté, associer l'image à cet utilisateur
        $user = $security->getUser();
        if ($user) {
            $photo->setUser($user);
        }

        // Enregistrer l'image dans la base de données
        $em->persist($photo);
        $em->flush();

        // Ajouter l'objet photo créé à la liste des fichiers téléchargés
        $uploadedFiles[] = $photo;
    }

    // Retourner une réponse JSON avec les fichiers enregistrés
    return new JsonResponse([
        'message' => 'Images enregistrées',
        'files' => array_map(function ($photo) {
            return $photo->getImage(); // Retourner uniquement les noms de fichiers
        }, $uploadedFiles)
    ]);
}


    #[Route('/photos', name: 'api_get_photos', methods: ['GET'])]
    public function getPhotos(EntityManagerInterface $em): JsonResponse
    {
        // Récupérer toutes les photos
        $photos = $em->getRepository(Photo::class)->findAll();
        
        // Formater les données pour le frontend
        $data = [];
        foreach ($photos as $photo) {
            $data[] = [
                'id' => $photo->getId(),
                'filename' => $photo->getImage(),
                'user' => $photo->getUser() ? $photo->getUser()->getEmail() : 'Anonyme',
                'username' => $photo->getUser() ? $photo->getUser()->getUsername() : 'Anonyme',
                'createdAt' => $photo->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse($data);
    }
}
