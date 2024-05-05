Nom de l'API: Gestion des locataires et des propriétés.
Description: Cette API permet de gérer les locataires, les propriétaires, les biens immobiliers, et les paiements associés. Les fonctionnalités incluent l'authentification, la création, la mise à jour et la suppression de ressources (biens, locataires, paiements, propriétaires).
Base URL: Ajoutez l'URL de base de votre API.

1. Introduction
   Nom de l'API: Gestion des locataires et des propriétés.
   Description: Cette API permet de gérer les locataires, les propriétaires, les biens immobiliers, et les paiements associés. Les fonctionnalités incluent l'authentification, la création, la mise à jour et la suppression de ressources (biens, locataires, paiements, propriétaires).
   Base URL: Ajoutez l'URL de base de votre API.

2. Authentification
   Type: Authentification par token (auth) pour toutes les routes nécessitant des permissions.
   En-têtes requis: Inclure un en-tête Authorization avec le token (Bearer YOUR_TOKEN).

3. Middlewares
   Authentification (auth)
   Description: Vérifie le token d'authentification dans l'en-tête Authorization et ajoute req.user et req.token aux objets de requête.
   Utilisation: Ajoutez ce middleware aux routes nécessitant une authentification.
   Paramètres: req, res, next.

   Actions:

   Vérifie le token (req.headers.authorization).
   Ajoute req.user et req.token à l'objet de requête.
   Si le token est invalide ou expiré, renvoie un code de statut 403.
   Autorisation (admin, isAdmin)
   Description: Vérifie si req.user a le rôle admin.
   Utilisation: Routes réservées aux administrateurs.

   Actions:
   Si req.user.role === "admin", passe à la route suivante.
   Sinon, renvoie un code de statut 401 avec un message d'erreur.
   Autorisation (lessor, isLessor)
   Description: Vérifie si req.user a le rôle lessor.
   Utilisation: Routes réservées aux propriétaires.

   Actions:
   Si req.user.role === "lessor", passe à la route suivante.
   Sinon, renvoie un code de statut 401 avec un message d'erreur.
   Autorisation (tenant, isTenant)
   Description: Vérifie si req.user a le rôle tenant.
   Utilisation: Routes réservées aux locataires.

   Actions:
   Si req.user.role === "tenant", passe à la route suivante.
   Sinon, renvoie un code de statut 401 avec un message d'erreur.
   Autorisation (tenant ou lessor, isTenantOrLessor)
   Description: Vérifie si req.user a le rôle tenant ou lessor.
   Utilisation: Routes réservées aux locataires ou propriétaires.

   Actions:
   Si req.user.role === "tenant" ou req.user.role === "lessor", passe à la route suivante.
   Sinon, renvoie un code de statut 401 avec un message d'erreur.

4. Routes d'authentification (authRouter)
   POST /signup
   Description: Crée un nouvel utilisateur.
   Données de requête: Objet JSON contenant les détails de l'utilisateur (email, password, etc.).
   Réponse: Code 201 en cas de succès. Objet JSON avec les détails de l'utilisateur créé.
   Exemple de requête:
   http
   Copy code
   POST /signup HTTP/1.1
   Content-Type: application/json

{
"email": "user@example.com",
"password": "password123",
...
}

POST /signup/:landLordRouteParams
Description: Crée un nouvel utilisateur en fonction des paramètres de route (landLordRouteParams).
Données de requête: Objet JSON contenant les détails de l'utilisateur.
Réponse: Code 201 en cas de succès. Objet JSON avec les détails de l'utilisateur créé.
Exemple de requête:
http
Copy code
POST /signup/routeParams HTTP/1.1
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123",
...
}
POST /signin
Description: Authentifie un utilisateur et renvoie un token d'accès.
Données de requête: Objet JSON avec l'email et le mot de passe de l'utilisateur.
Réponse: Code 200 en cas de succès. Objet JSON contenant le token d'accès.

Exemple de requête:
http
Copy code POST /signin HTTP/1.1
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123"
}

POST /login
Description: Identique à POST /signin, mais utilise une logique d'authentification différente.
Données de requête: Objet JSON avec l'email et le mot de passe de l'utilisateur.
Réponse: Code 200 en cas de succès. Objet JSON contenant le token d'accès.

GET /activate-account
Description: Active un compte utilisateur (ex. après vérification d'email).
Données de requête: Aucun.
Réponse: Code 200 en cas de succès.
Exemple de requête:
http
Copy code
GET /activate-account HTTP/1.1

GET /logout
Description: Déconnecte l'utilisateur et invalide le token d'accès.
Données de requête: Aucun.
Réponse: Code 200 en cas de succès.
POST /recover-account
Description: Permet de récupérer un compte (ex. réinitialisation de mot de passe).
Données de requête: Objet JSON avec l'email de l'utilisateur.
Réponse: Code 200 en cas de succès. Message indiquant que les instructions de récupération ont été envoyées.
Exemple de requête:
http
Copy code
POST /recover-account HTTP/1.1
Content-Type: application/json

{
"email": "user@example.com"
}

POST /delete-account
Description: Supprime un compte utilisateur.
Données de requête: Objet JSON contenant les informations nécessaires à la suppression du compte.
Réponse: Code 200 en cas de succès. Message indiquant que le compte a été supprimé.

5. Routes de biens immobiliers (houseRouter)

GET /
Description: Récupère la liste de tous les biens immobiliers.
Middleware: auth, isLessor.
Réponse: Code 200 en cas de succès. Objet JSON contenant la liste des biens.
Exemple de requête:
http
Copy code GET / HTTP/1.1
Authorization: Bearer YOUR_TOKEN

GET /:houseId
Description: Récupère les détails d'un bien immobilier par son ID (houseId).
Middleware: auth, isTenantOrLessor.
Réponse: Code 200 en cas de succès. Objet JSON contenant les détails du bien.
Exemple de requête:

GET /:houseId HTTP/1.1
Authorization: Bearer YOUR_TOKEN

GET /:houseId HTTP/1.1
Authorization: Bearer YOUR_TOKEN

Exemple de réponse:

{
"houseId": 1,
"name": "Maison",
"address": "123 rue Exemple",
...
}
GET /lessor/:lessorId

Description: Récupère les biens immobiliers associés à un propriétaire (lessorId).
Middleware: auth.
Réponse: Code 200 en cas de succès. Objet JSON contenant la liste des biens.
POST /add
Description: Crée un nouveau bien immobilier.
Middleware: auth, isLessor.
Données de requête: Objet JSON contenant les détails du bien.
Réponse: Code 201 en cas de succès. Objet JSON contenant les détails du bien créé.

PUT /update/:houseId
Description: Met à jour un bien immobilier par son ID (houseId).
Middleware: auth, isLessor.
Données de requête: Objet JSON contenant les détails à mettre à jour.
Réponse: Code 200 en cas de succès. Objet JSON contenant les détails du bien mis à jour.

DELETE /delete/:houseId

Description: Supprime un bien immobilier par son ID (houseId).
Middleware: auth, isLessor.
Réponse: Code 200 en cas de succès. Message indiquant que le bien a été supprimé.
DELETE /delete
Description: Supprime tous les biens immobiliers.
Middleware: auth, isLessor.
Réponse: Code 200 en cas de succès. Message indiquant que tous les biens ont été supprimés.

6. Routes de propriétaires (landLordRouter)
   GET /
   Description: Récupère la liste de tous les propriétaires.
   Middleware: auth, isAdmin.
   Réponse: Code 200 en cas de succès. Objet JSON contenant la liste des propriétaires.
   GET /:landlordId
   Description: Récupère les détails d'un propriétaire par son ID (landlordId).
   Middleware: auth, isLessor.
   Réponse: Code 200 en cas de succès. Objet JSON contenant les détails du propriétaire.

POST /add

Description: Crée un nouveau propriétaire.
Middleware: auth, isLessor.
Données de requête: Objet JSON contenant les détails du propriétaire.
Réponse: Code 201 en cas de succès. Objet JSON contenant les détails du propriétaire créé.
PUT /update/:landlordId
Description: Met à jour un propriétaire par son ID (landlordId).
Middleware: auth, isLessor.
Données de requête: Objet JSON contenant les détails à mettre à jour.
Réponse: Code 200 en cas de succès. Objet JSON contenant les détails du propriétaire mis à jour.

DELETE /delete/:landlordId

Description: Supprime un propriétaire par son ID (landlordId).
Middleware: auth, isLessor.
Réponse: Code 200 en cas de succès. Message indiquant que le propriétaire a été supprimé.

DELETE /delete
Description: Supprime tous les propriétaires.
Middleware: auth, isAdmin.
Réponse: Code 200 en cas de succès. Message indiquant que tous les propriétaires ont été supprimés.

7. Routes de paiements (payementRouter)
   POST /add
   Description: Crée un nouveau paiement.
   Middleware: auth, isLessor.
   Données de requête: Objet JSON contenant les détails du paiement.
   Réponse: Code 201 en cas de succès. Objet JSON contenant les détails du paiement créé.
   PUT /update/:payId
   Description: Met à jour un paiement par son ID (payId).
   Middleware: auth, isLessor.
   Données de requête: Objet JSON contenant les détails à mettre à jour.
   Réponse: Code 200 en cas de succès. Objet JSON contenant les détails du paiement mis à jour.
   DELETE /delete/:payId
   Description: Supprime un paiement par son ID (payId).
   Middleware: auth, isLessor.
   Réponse: Code 200 en cas de succès. Message indiquant que le paiement a été supprimé.

DELETE /delete
Description: Supprime tous les paiements.
Middleware: auth, isLessor.
Réponse: Code 200 en cas de succès. Message indiquant que tous les paiements ont été supprimés.

8. Routes de locataires (tenantRouter)
   GET /
   Description: Récupère la liste de tous les locataires.
   Middleware: Aucun.
   Réponse: Code 200 en cas de succès. Objet JSON contenant la liste des locataires.

GET /:tenantId
Description: Récupère les détails d'un locataire par son ID (tenantId).
Middleware: auth.
Réponse: Code 200 en cas de succès. Objet JSON contenant les détails du locataire.

GET /lessor/:lessorId
Description: Récupère les locataires associés à un propriétaire (lessorId).
Middleware: Aucun.
Réponse: Code 200 en cas de succès. Objet JSON contenant la liste des locataires.

POST /add
Description: Crée un nouveau locataire.
Middleware: auth.
Données de requête: Objet JSON contenant les détails du locataire.
Réponse: Code 201 en cas de succès. Objet JSON contenant les détails du locataire créé.

PUT /update/:tenantId
Description: Met à jour un locataire par son ID (tenantId).
Middleware: auth.
Données de requête: Objet JSON contenant les détails à mettre à jour.
Réponse: Code 200 en cas de succès. Objet JSON contenant les détails du locataire mis à jour.

DELETE /delete/:tenantId
Description: Supprime un locataire par son ID (tenantId).
Middleware: auth, isLessor.
Réponse: Code 200 en cas de succès. Message indiquant que le locataire a été supprimé.

DELETE /delete
Description: Supprime tous les locataires.
Middleware: auth.
Réponse: Code 200 en cas de succès. Message indiquant que tous les locataires ont été supprimés.

9. Routes d'utilisateurs (userRouter)
   GET /:userId
   Description: Récupère les détails d'un utilisateur par son ID (userId).
   Middleware: auth.
   Réponse: Code 200 en cas de succès. Objet JSON contenant les détails de l'utilisateur.

GET /handle/:userHandle
Description: Récupère un utilisateur par son pseudo (userHandle).
Middleware: auth, isTenantOrLessor.
Réponse: Code 200 en cas de succès. Objet JSON contenant les détails de l'utilisateur.

POST /add
Description: Crée un nouvel utilisateur.
Middleware: auth, isLessor.
Données de requête: Objet JSON contenant les détails de l'utilisateur.
Réponse: Code 201 en cas de succès. Objet JSON contenant les détails de l'utilisateur créé.

PUT /update/:userId
Description: Met à jour un utilisateur par son ID (userId).
Middleware: auth, isLessor.
Données de requête: Objet JSON contenant les détails à mettre à jour.
Réponse: Code 200 en cas de succès. Objet JSON contenant les détails de l'utilisateur mis à jour.

DELETE /delete/:userId
Description: Supprime un utilisateur par son ID (userId).
Middleware: auth, isLessor.
Réponse: Code 200 en cas de succès. Message indiquant que l'utilisateur a été supprimé.

DELETE /delete
Description: Supprime tous les utilisateurs.
Middleware: auth, isLessor.
Réponse: Code 200 en cas de succès. Message indiquant que tous les utilisateurs ont été supprimés.

10. Ressources additionnelles
    Liens utiles: Guides, FAQ, etc.
    Contact: Comment contacter l'équipe pour obtenir de l'aide.
    Cette documentation vous donne une vue d'ensemble
