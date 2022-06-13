# PJI - Application web pour la gestion d'un restaurant

## Contexte

Un restarant de plats mix (traditionnels et fast-food) veut attirir plus de clients en leurs donnant la possibilité de commander en ligne et de venir chercher leurs commandes, ainsi que la possibilité de profiter de leurs repas sur place.
Pour faciliter la gestion, le gerant a pour idée de creer une application web qui va l'aider à automatiser les taches de gestion du restaurant.

## Problématique

Pour promouvoir son restaurant, le gerant à besoin d'une application web, qui permettra d'afficher tous les informations sur le restaurant ainsi que de donner la possibilité aux clients de passer leurs commandes en ligne, et de reserver des tables pour des occasions speciales.
Le gerant aura aussi la possibilité de gerer son stock et son menu.

## les fonctionnalités attendues

à la fin du projet, en utilisant l'application web:

Le gérant doit pouvoir:
- Gerer les informations du restaurant
  - modifier les information lier au restaurant (adresse, images...)
- Gerer les comptes:
  - creer un compte pour les autres gerants, employées
  - modifier ou supprimer un compte d'employée
- Gerer les menus:
  - CRUD un plat
  - CRUD les categories des plats, menus (dessert, plat chaud, burger...)
- Gerer les commandes:
  - afficher, modifier, et annuler une commande

Un employée doit pouvoir:
- Gerer son compte
  - modifier ses informations personnelles
- Gerer les menus:
  - CRUD un plat
  - CRUD les categories des plats, menus (dessert, plat chaud, burger...)
- Gerer les commandes:
  - passer une commande.
  - afficher, modifier une commande.

Un client doit pouvoir:
- Gerer son compte
  - modifier ses informations personnelles
  - desactiver son compte.
- Gerer les commandes:
  - passer, afficher une commande.
  - afficher mes commandes.
  - demander le rembourssement d'une commande.

Les autres fonctionnalités ne seront pas à developper pour le PJI, mais je vais le fair apres la fin du projet.

## Informations detaillées:

Un compte a un type qui prendre une des valeurs suivantes (owner, worker, client) ainsi que les informations personnelles de l'utilisateur.

Un plat a un nom et une description avec les ingredients et le prix, chaque plat est lié à une categorie.

Les menus sont composées de plusieurs plats et ont un prix different de celui de la somme des plats. Un menu est aussi consideré comme plat dans la categorie "MENU".

Quand un utilisateur passe une commande, il peut ajouter un commentaire pour chaque article choisi. et de valider sa commande, pour payer sur place (pour le moment). L'utilisateur peut aussi annuler sa commande s'elle n'est pas en cours de preparation, et demander un rembourssement en cas de probleme. seul le gerant peux remboursser un client.

## La feuille de route

Pour la feuille de route, je pense que je peux :
1. commencer par le design du site, affichage des info, menus ... (présentation statique)
2. la gestion des comptes (CRUD, login, inscription) avec différents types de comptes ( owner, worker, client)
3. la gestion des plats (CRUD)
4. gestion des menus (CRUD).
5. la gestion des commandes (passer une commande, changer l'état, annuler commande, remboursser une commande)

Pour chaque etape, je vais travailler sur le back puis le front.

## Les Framworks à utiliser

Pour le front-end, je vais utiliser Angular qui va transmettre et recuperer les donnees en utilisant une API.

Pour le back-end, Je vais utiliser Spring boot pour developper l'API utilisé par angular et qui va utiliser une base de données MongoDb. 