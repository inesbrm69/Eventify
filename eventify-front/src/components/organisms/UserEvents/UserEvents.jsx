import { useEffect, useState } from "react";
import { getLoggedUser, getAllEvents } from "../../../services/api";
import Event from "../Event/Event";

const UserEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const user = getLoggedUser();

  useEffect(() => {
    const fetchUserEvents = async () => {
      const allEvents = await getAllEvents();
      const filteredEvents = allEvents.filter(event => event.participants.includes(user.id));
      setUserEvents(filteredEvents);
    };

    fetchUserEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mes événements</h2>
      <div className="flex flex-wrap gap-4">
        {userEvents.length > 0 ? (
          userEvents.map(event => <Event key={event.id} {...event} setEvents={setUserEvents} />)
        ) : (
          <p>Aucun événement inscrit.</p>
        )}
      </div>
    </div>
  );
};

export default UserEvents;