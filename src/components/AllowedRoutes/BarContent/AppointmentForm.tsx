import React, { useState } from 'react';


type PopupProps = {
  onClose: () => void; // Function to close the popup
};

const AppointmentForm: React.FC<PopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name,setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('description', description);
    formData.append('name',name);
    formData.append('link',link);

    // Submit the form data to Formspree
    fetch('https://formspree.io/f/meqbdwya', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      },
    }).then(response => {
      if (response.ok) {
        // Handle success, such as showing a confirmation message
        onClose(); // Close the popup after submitting
      } else {
        // Handle errors
      }
    }).catch(error => {
      // Handle network errors
      console.log(error)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Book Your Appointment</h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 px-3 py-2 bg-white border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
                required
              />
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 px-3 py-2 bg-white border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
                required
              />
              <textarea
                placeholder="Describe your meeting purpose"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 px-3 py-2 bg-white border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
                required
              />
              <textarea
                placeholder="Link your business or socials"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-2 px-3 py-2 bg-white border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
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
              <p>You should receive a zoom meeting link within the next 24-48 hours.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
