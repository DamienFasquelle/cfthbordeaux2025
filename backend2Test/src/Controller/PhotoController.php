<?php
namespace App\Controller;

use App\Entity\Photo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        Security $security
    ): JsonResponse {
        $user = $security->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Vous devez être connecté pour publier des photos.'], Response::HTTP_UNAUTHORIZED);
        }

        $files = $request->files->get('images');
        if (!$files || count($files) === 0) {
            return new JsonResponse(['error' => 'Aucun fichier reçu.'], Response::HTTP_BAD_REQUEST);
        }

        $uploadedFiles = [];

        try {
            foreach ($files as $file) {
                if (!$file->isValid()) {
                    return new JsonResponse(['error' => 'Fichier invalide.'], Response::HTTP_BAD_REQUEST);
                }

                $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

                $file->move(
                    $this->getParameter('kernel.project_dir') . '/public/uploads/photos',
                    $newFilename
                );

                $photo = new Photo();
                $photo->setImage($newFilename);
                $photo->setUser($user);

                $em->persist($photo);
                $uploadedFiles[] = $photo;
            }

            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Erreur lors du téléchargement du fichier : ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse([
            'message' => 'Images enregistrées avec succès',
            'files' => array_map(function (Photo $photo) {
                return [
                    'id' => $photo->getId(),
                    'filename' => $photo->getImage(),
                    'username' => $photo->getUser() ? $photo->getUser()->getUserIdentifier() : 'Anonyme',
                ];
            }, $uploadedFiles)
        ], Response::HTTP_CREATED);
    }




    #[Route('/photos', name: 'api_get_photos', methods: ['GET'])]
    public function getPhotos(EntityManagerInterface $em): JsonResponse
    {
        $photos = $em->getRepository(Photo::class)->findAll();
        
        $data = [];
        foreach ($photos as $photo) {
            $data[] = [
                'id' => $photo->getId(),
                'filename' => $photo->getImage(),
                'username' => $photo->getUser() ? $photo->getUser()->getUsername() : 'Anonyme',
                'createdAt' => $photo->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse($data, Response::HTTP_OK);
    }
    
}


