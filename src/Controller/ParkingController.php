<?php

namespace App\Controller;

use App\Entity\Parking;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ParkingController extends AbstractController
{
    #[Route('/', name: 'app_parking')]
    public function index(): Response
    {
        return $this->render('default/homepage.html.twig');
    }

    #[Route('/contact', name: 'app_contact')]
    public function getContact(): Response
    {
        return $this->render('default/contact.html.twig');
    }

    #[Route('/responsibility', name: 'app_responsibility')]
    public function getResponsibility(): Response
    {
        return $this->render('default/responsibility.html.twig');
    }

    #[Route('/gallery', name: 'app_gallery')]
    public function getGallery(): Response
    {
        return $this->render('default/gallery.html.twig');
    }

    #[Route('/load_ballance', name: 'app_load')]
    public function loadBallance(): Response
    {
        return $this->render('default/load_ballance.html.twig');
    }


    #[Route('/create_parking', name: 'create_product')]
    public function createParking(EntityManagerInterface $entityManager): Response
    {
        //$parking = new Parking();
        //$parking->setName('Keyboard');
        //$parking->setAddress('Hakushy 4');
        //$parking->setPhone('Ergonomic and stylish!');
	//$parking->setType('owner');
	//$parking->setVehicle('Audi');
	//$parking->setLicensePlate('AT 9229 BE');
	//$parking->setComment("I want to have a parking place");


        // tell Doctrine you want to (eventually) save the Parking (no queries yet)
        //$entityManager->persist($parking);

        // actually executes the queries (i.e. the INSERT query)
	//$entityManager->flush();

	return $this->render('parking/add_new.html.twig');


        //return new Response('Saved new parking with id '.$parking->getId());
    }

    #[Route('/parking/{id}', name: 'parking_show')]
    public function show(EntityManagerInterface $entityManager, int $id): Response
    {
        $parking = $entityManager->getRepository(Parking::class)->find($id);

        if (!$parking) {
            throw $this->createNotFoundException(
                'No parking found for id '.$id
            );
        }

        // return new Response('Check out this great parking: '.$parking->getName());

        // or render a template
        // in the template, print things with {{ product.name }}
        return $this->render('parking/parking.html.twig', ['parking' => $parking]);
    }

    #[Route('/parking_show_all', name: 'parking_show_all')]
    public function showAll(EntityManagerInterface $entityManager): Response
    {
        $parking = $entityManager->getRepository(Parking::class)->findBy([], ['id' => 'ASC']);

        if (!$parking) {
            throw $this->createNotFoundException(
                'No parkings found'
            );
        }

        // return new Response('Check out this great parking: '.$parking->getName());

        // or render a template
        // in the template, print things with {{ product.name }}
        return $this->render('parking/show_all.html.twig', ['parking' => $parking]);
    }

}
