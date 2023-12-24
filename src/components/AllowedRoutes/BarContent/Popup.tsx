import React, { useState } from 'react';

// Popup.tsx - Ensure to place this file in the same directory as your UserServices.tsx

type PopupProps = {
    onSubmit: (formData: FormData, file: File) => void;
    onClose: () => void; // Function to close the popup
  };


  type FormData = {
    title: string;
    description: string;
    price: number | null; // price can be a number or null
  };
  
  
  const Popup: React.FC<PopupProps> = ({ onSubmit, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price] = useState<number | null>(null);
    const [file, setFile] = useState<File | null>(null);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (file) {
        onSubmit({ title, description, price }, file);
        onClose(); // Close the popup after submitting
      } else {
        // Handle error for file not selected
      }
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const file = files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
        if (allowedTypes.includes(file.type)) {
          setFile(file);
        } else {
          // Handle the error for the wrong file type
          alert('Invalid file type. Only PNG, JPG, and GIF files are allowed.');
          // Optionally, you can reset the file input
          e.target.value = ''; // This line will ensure the file input is cleared
        }
      }
    };
    
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Post</h3>
            <div className="mt-2 px-7 py-3">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 px-3 py-2 bg-white border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 px-3 py-2 bg-white border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
                  required
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2 px-3 py-2 w-full"
                  required
                />
                <div className="items-center px-4 py-3">
                  <button
                    id="submit"
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                  <button
                    id="cancel"
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 mt-3 bg-gray-300 text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Popup;
  