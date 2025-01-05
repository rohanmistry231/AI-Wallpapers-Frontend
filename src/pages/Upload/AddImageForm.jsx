import React, { useState } from 'react';
import axios from 'axios';

const AddImageForm = () => {
  const [formData, setFormData] = useState({
    imageName: '',
    imageUrl: '',
    downloadUrl: '',
    category: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // POST request to backend
      const response = await axios.post('https://ai-wallpapers-backend.vercel.app/mages', formData);

      if (response.status === 201) {
        setMessage('Image added successfully!');
        setFormData({
          imageName: '',
          imageUrl: '',
          downloadUrl: '',
          category: '',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to add image. Please check the inputs and try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Image</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image Name</label>
          <input
            type="text"
            name="imageName"
            value={formData.imageName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter image name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Download URL</label>
          <input
            type="url"
            name="downloadUrl"
            value={formData.downloadUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter download URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter category (e.g., Nature, Abstract)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddImageForm;
