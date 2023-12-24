import React, { useState, useEffect } from 'react';
import { auth, firestore } from "../../authentication/firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UserDescription = () => {
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    const fetchDescription = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const usernamesRef = doc(firestore, 'usernames', currentUser.uid);
        const docSnap = await getDoc(usernamesRef);

        if (docSnap.exists() && docSnap.data().publicId) {
          const publicId = docSnap.data().publicId;
          const userPublicProfileRef = doc(firestore, 'users_public_ids', publicId);
          const userPublicProfileSnap = await getDoc(userPublicProfileRef);
          if (userPublicProfileSnap.exists()) {
            setDescription(userPublicProfileSnap.data().UserDescription || '');
          }
        }
      }
    };

    fetchDescription();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //limit
    const wordCount = description.trim().split(/\s+/).length;

  if (wordCount > 100) {
    setError('Description cannot exceed 100 words.');
    return; // Exit the function if word count exceeds 100
  }

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const usernamesRef = doc(firestore, 'usernames', currentUser.uid);
        const docSnap = await getDoc(usernamesRef);

        if (docSnap.exists() && docSnap.data().publicId) {
          const publicId = docSnap.data().publicId;
          const userPublicProfileRef = doc(firestore, 'users_public_ids', publicId);
          await updateDoc(userPublicProfileRef, { UserDescription: description });
          setSuccess('Description has been updated successfully.');
        } else {
          setError('Unable to find public profile information.');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
      }
    } else {
      alert("No user is signed in.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
    <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
          Describe yourself in no more than 100 words limit max.
        </label>
        <textarea
          id="description"
          rows={4}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Describe yourself..."
          value={description}
          onChange={handleChange} // Now correctly typed for a textarea
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Description
        </button>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        {success && <p className="text-green-500 text-xs italic">{success}</p>}
      </div>
    </form>
  </div>
  

  );
  
}

export default UserDescription;
