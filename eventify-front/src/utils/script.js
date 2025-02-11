import { srcImg } from "../assets/index";

const addEventsToLocalStorage = () => {
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

    const newEvents = [
        {
            id: 1,
            title: "Atelier de Peinture",
            description: "Venez explorer votre créativité dans cet atelier de peinture.",
            date: "2025-03-10",
            category: "Art",
            localisation: "Paris",
            image: srcImg.art[0], 
        },
        {
            id: 2,
            title: "Galerie Moderne",
            description: "Une exposition captivante d'art moderne.",
            date: "2025-04-15",
            category: "Art",
            localisation: "Lyon",
            image: srcImg.art[1], 
        },
        {
            id: 3,
            title: "Peintures Classiques",
            description: "Découvrez des chefs-d'œuvre classiques dans une ambiance unique.",
            date: "2025-05-05",
            category: "Art",
            localisation: "Marseille",
            image: srcImg.art[2], 
        },
        {
            id: 4,
            title: "Art Digital",
            description: "Plongez dans l'univers fascinant de l'art numérique.",
            date: "2025-06-20",
            category: "Art",
            localisation: "Nice",
            image: srcImg.art[3], 
        },
        {
            id: 5,
            title: "Exposition Van Gogh",
            description: "Un voyage immersif dans l'œuvre de Van Gogh.",
            date: "2025-07-10",
            category: "Art",
            localisation: "Bordeaux",
            image: srcImg.art[4],
        },
        {
            id: 6,
            title: "Soirée Interactive",
            description: "Participez à une soirée d'art interactif.",
            date: "2025-08-05",
            category: "Art",
            localisation: "Toulouse",
            image: srcImg.art[5], 
        },
        {
            id: 7,
            title: "Art et Lumière",
            description: "Découvrez l'art sous un nouveau jour avec des projections lumineuses.",
            date: "2025-09-15",
            category: "Art",
            localisation: "Nantes",
            image: srcImg.art[6], 
        },
        {
            id: 8,
            title: "Galerie des Maîtres",
            description: "Une collection exclusive des plus grands maîtres de la peinture.",
            date: "2025-10-01",
            category: "Art",
            localisation: "Strasbourg",
            image: srcImg.art[7], 
        },
        {
            id: 9,
            title: "L'Art du Paysage",
            description: "Une exploration artistique des paysages naturels.",
            date: "2025-11-20",
            category: "Art",
            localisation: "Rennes",
            image: srcImg.art[8], 
        },
        {
            id: 10,
            title: "Exposition d'Affiches de Films Cultes",
            description: "Découvrez une collection exclusive d'affiches iconiques de films cultes.",
            date: "2025-02-20",
            category: "Cinéma",
            localisation: "Paris",
            image: srcImg.cinema[0], 
        },
        {
            id: 11,
            title: "Soirée Films Classiques",
            description: "Une soirée dédiée aux classiques intemporels du cinéma.",
            date: "2025-03-05",
            category: "Cinéma",
            localisation: "Lyon",
            image: srcImg.cinema[1], 
        },
        {
            id: 12,
            title: "Projection et Débat : Cinéma Moderne",
            description: "Participez à la projection d'un film moderne suivi d'un débat avec des experts.",
            date: "2025-04-15",
            category: "Cinéma",
            localisation: "Marseille",
            image: srcImg.cinema[2], 
        },
        {
            id: 13,
            title: "Festival du Film Indépendant",
            description: "Un festival célébrant les films indépendants de réalisateurs émergents.",
            date: "2025-05-10",
            category: "Cinéma",
            localisation: "Bordeaux",
            image: srcImg.cinema[1], 
        },
        {
            id: 14,
            title: "Soirée Oscar : Projection des Gagnants",
            description: "Une soirée spéciale pour découvrir les films gagnants des Oscars.",
            date: "2025-06-25",
            category: "Cinéma",
            localisation: "Nice",
            image: srcImg.cinema[0], 
        },
        {
            id: 15,
            title: "Marathon de Films de Science-Fiction",
            description: "Préparez-vous à plonger dans l'univers fascinant des films de science-fiction.",
            date: "2025-07-15",
            category: "Cinéma",
            localisation: "Toulouse",
            image: srcImg.cinema[2], 
        },
    ];

    const updatedEvents = newEvents.map((newEvent) => {
        const existingEvent = existingEvents.find((event) => event.id === newEvent.id);
        return existingEvent ? { ...existingEvent, ...newEvent } : newEvent;
    });

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    console.log("Événements mis à jour :", updatedEvents);
};

// Exécuter le script
addEventsToLocalStorage();