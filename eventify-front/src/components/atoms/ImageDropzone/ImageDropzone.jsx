import React, { useState, useRef } from "react";

const ImageDropzone = ({ onImageSelect, existingFilenames = [] }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null); // 🔁 pour contrôler le input caché

  const handleDrop = (e) => {
    e.preventDefault();
    setError("");
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError("");
    processFile(file);
  };

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Le fichier doit être une image.");
      return;
    }

    if (existingFilenames.includes(file.name)) {
      setError("Ce nom d'image existe déjà.");
      return;
    }

    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);
    onImageSelect(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-blue-400 p-4 rounded text-center bg-gray-100"
    >
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Dépose une image ou clique pour sélectionner
      </label>
      
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Choisir une image
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {preview && (
        <img
          src={preview}
          alt="Aperçu"
          className="mt-4 mx-auto max-h-48 rounded shadow"
        />
      )}
    </div>
  );
};

export default ImageDropzone;