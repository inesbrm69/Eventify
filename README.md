# Eventify - Plateforme de gestion d'événements

Eventify est une plateforme qui permet aux utilisateurs de créer, rechercher, filtrer et s'inscrire à des événements. Elle offre également une gestion des utilisateurs et la possibilité de voir les événements auxquels un utilisateur est inscrit.

### Fonctionnalités Principales

##### Gestion des événements :

    - Création d'événements avec titre, description, date, lieu et image
    - Affichage d'une liste des événements disponibles

##### Filtrage et Recherche :
    
    - Recherche d'événements par mot-clé (Localisation etc.)
    - Filtrage par catégorie

##### Participation et Rappels :

    - Inscription/Désinscription aux événements
    - Rappels dynamiques :
        * Événements dans -7 jours
        * Événements dans -2 jours

##### Authentification :
    - Sélection d'un utilisateur pour se connecter
    - Gestion de la connexion/déconnexion

### Installation & Lancement

#### Cloner le projet 
```
    git clone https://github.com/ton-projet/eventify.git
    cd .\eventify-front
```

#### Installer les dépendances
```
    npm install
```

#### Démarrer le back
    Lancer JSON Server et le serveur Node.js dans deux terminaux distincts :
```
    cd .\eventify-front
    json-server --watch data/data.json --port 3000

    cd .\eventify-server
    node server.js
``` 
#### Démarrer le front
Dans un autre terminal :
```
    npm run dev
```

### Utilisation

    1. Se connecter avec un utilisateur existant
    2. Parcourir les événements disponibles
    3. Rechercher et filtrer par catégorie
    4. S'inscrire ou se désinscrire d'un événement
    5. Voir les rappels d'événements à venir
    6. Se déconnecter et être redirigé vers la page de connexion

### Technologies Utilisées
    - Frontend : React, Tailwind CSS
    - Backend : JSON Server (simulation d'une API REST)
    - Routing : React Router
    - Gestion d'état : useState, useContext
    - Stockage : LocalStorage pour la gestion des utilisateurs
