# Eventify - Plateforme de gestion d'événements

Eventify est une plateforme qui permet aux utilisateurs de créer, rechercher, filtrer et s'inscrire à des événements. Elle offre également une gestion des utilisateurs et la possibilité de voir les événements auxquels un utilisateur est inscrit.

### Objectifs du projet

Créer une application web où les utilisateurs peuvent :

- Créer des événements (titre, description, date, heure, lieu, image).
- Voir une liste des événements disponibles.
- Rechercher et filtrer les événements par catégories (par exemple : Conférences, Sports, Soirées, etc.).
- S'inscrire à un événement et gérer leur liste d'inscriptions.
- Utiliser des notifications pour rappeler les événements à venir.

### Comment démarrer le back 

```
    cd .\eventify-front
    json-server --watch data/data.json --port 3000

    cd .\eventify-server
    node server.js
``` 
