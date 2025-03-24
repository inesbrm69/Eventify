import React, { useState, useEffect } from "react";
import { ImageDropzone, SelectBox } from "../../atoms";
import { createEvent, uploadImage, getAllEvents } from "../../../services/api";

const EventForm = ({ onSubmit, setEvents }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [localisations, setLocalisations] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    localisation: "",
    category: ""
  });

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const events = await getAllEvents();
        setCategories([...new Set(events.map(e => e.category).filter(Boolean))]);
        setLocalisations([...new Set(events.map(e => e.localisation).filter(Boolean))]);
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
      }
    };
    fetchMeta();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imagePath = "";

      if (selectedImage) {
        const uploadedImageName = await uploadImage(selectedImage);
        imagePath = uploadedImageName;
      }

      const newEvent = await createEvent({
        ...formData,
        image: imagePath,
        participants: []
      });

      setEvents((prev) => [...prev, newEvent]);
      onSubmit();
    } catch (err) {
      console.error("Erreur attrapée pendant la création :", err);
      alert("Erreur lors de la création");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
      <Input label="Titre" name="title" value={formData.title} onChange={handleChange} />
      <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
      <Input label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />

      <SelectBox
        selectedValue={formData.localisation}
        setSelectedValue={(value) => setFormData((prev) => ({ ...prev, localisation: value }))}
        options={localisations}
        title="Choisir une localisation"
      />

      <ImageDropzone onImageSelect={(file) => setSelectedImage(file)} />

      <SelectBox
        selectedValue={formData.category}
        setSelectedValue={(value) => setFormData((prev) => ({ ...prev, category: value }))}
        options={categories}
        title="Choisir une catégorie"
      />

      <div className="text-center pt-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg"
        >
          Créer
        </button>
      </div>
    </form>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 text-sm font-semibold text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default EventForm;