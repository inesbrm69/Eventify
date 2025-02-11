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
        { id: 1, title: "Conférence React", date: "2025-03-01", category: "Conférence", location: "Paris" },
        { id: 2, title: "Match de Football", date: "2025-04-10", category: "Sport", location: "Marseille" }
    ];
    const uniqueEvents = [...existingEvents, ...newEvents].filter(
        (event, index, self) =>
            index === self.findIndex((e) => e.id === event.id)
    );
    localStorage.setItem("events", JSON.stringify(uniqueEvents));
    console.log("Événements mis à jour :", uniqueEvents);
};

addDataToLocalStorage();
