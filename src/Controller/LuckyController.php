<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class LuckyController extends AbstractController
{
    #[Route('/lucky/number')]	
    public function number(): Response
    {
        $number = random_int(0, 100);

	return $this->render('lucky/number.html.twig', [
            'number' => 778,
        ]);
    }

    #[Route('/lucky/test')]
    public function test(): Response
    {

        return new Response('Simple text handling with symfony.');
    }

}
