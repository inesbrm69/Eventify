const addDataToLocalStorage = () => {
    // --- Utilisateurs ---
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = [
        { email: "admin@admin.com", password: "admin123" },
        { email: "user@example.com", password: "password" }
    ];
    const uniqueUsers = [...existingUsers, ...newUsers].filter(
        (user, index, self) =>
            index === self.findIndex((u) => u.email === user.email)
    );
    localStorage.setItem("users", JSON.stringify(uniqueUsers));
    console.log("Utilisateurs mis à jour :", uniqueUsers);

    // --- Événements ---
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    const newEvents = [
        {
            id: 1,
            title: "Conférence React",
            description: "Une conférence passionnante sur les concepts avancés de React.",
            date: "2025-03-01",
            category: "Conférence",
            localisation: "Paris",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            title: "Match de Football",
            description: "Un match entre deux équipes célèbres pour les amateurs de sport.",
            date: "2025-04-10",
            category: "Sport",
            localisation: "Marseille",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            title: "Concert Jazz",
            description: "Une soirée musicale dédiée au jazz avec des artistes de renommée mondiale.",
            date: "2025-06-15",
            category: "Musique",
            localisation: "Lyon",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 4,
            title: "Hackathon Web",
            description: "Un hackathon de 48 heures pour développer des solutions innovantes.",
            date: "2025-07-20",
            category: "Technologie",
            localisation: "Bordeaux",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 5,
            title: "Soirée Cinéma",
            description: "Projection de films classiques sous les étoiles.",
            date: "2025-08-05",
            category: "Divertissement",
            localisation: "Nice",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 6,
            title: "Festival de Théâtre",
            description: "Des pièces de théâtre captivantes jouées par des troupes talentueuses.",
            date: "2025-09-10",
            category: "Culture",
            localisation: "Toulouse",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 7,
            title: "Exposition d'Art",
            description: "Une exposition mettant en avant les œuvres d'artistes contemporains.",
            date: "2025-10-18",
            category: "Art",
            localisation: "Nantes",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 8,
            title: "Compétition d'Échecs",
            description: "Une compétition intense pour les amateurs et professionnels des échecs.",
            date: "2025-11-12",
            category: "Jeux",
            localisation: "Montpellier",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 9,
            title: "Marathon",
            description: "Un marathon pour les sportifs prêts à relever le défi.",
            date: "2025-12-01",
            category: "Sport",
            localisation: "Rennes",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 10,
            title: "Atelier de Cuisine",
            description: "Un atelier pour apprendre des recettes délicieuses avec un chef expérimenté.",
            date: "2025-12-15",
            category: "Cuisine",
            localisation: "Strasbourg",
            image: "https://via.placeholder.com/150"
        }
    ];
    const uniqueEvents = [...existingEvents, ...newEvents].filter(
        (event, index, self) =>
            index === self.findIndex((e) => e.id === event.id)
    );
    localStorage.setItem("events", JSON.stringify(uniqueEvents));
    console.log("Événements mis à jour :", uniqueEvents);
};

addDataToLocalStorage();
