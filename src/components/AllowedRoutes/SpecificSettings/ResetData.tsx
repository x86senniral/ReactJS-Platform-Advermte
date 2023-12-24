import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../authentication/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ResetData: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    setCurrentUsername(user?.displayName || 'No username set');
  }, []);

  const handleUsernameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
      setError('Username must only contain letters, numbers, and underscores.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError('No user is signed in.');
      return;
    }

    // Fetch the public ID from the 'usernames' collection using the UUID
    const usernameRef = doc(firestore, 'usernames', user.uid);
    const docSnap = await getDoc(usernameRef);

    if (docSnap.exists() && docSnap.data().publicId) {
      const publicId = docSnap.data().publicId;
      // Now use the public ID to update the 'users_public_ids' collection
      const publicProfileRef = doc(firestore, 'users_public_ids', publicId);

      try {
        await updateDoc(publicProfileRef, {
          username: newUsername // Update the username field
        });

        // Update the display name in Firebase Auth
        await updateProfile(user, { displayName: newUsername });
        setCurrentUsername(newUsername);
        setSuccess('Username updated successfully.');
        setNewUsername('');
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error updating Firestore document: ${error.message}`);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    } else {
      setError('Unable to find your public profile information.');
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-black">
      <h1 className="text-3xl font-bold mb-4">Your Current Username: {currentUsername}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl mb-2">Change Username</h3>
        <form onSubmit={handleUsernameChange} className="flex items-center">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="New Username"
            required
            className="w-64 px-4 py-2 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Username
          </button>
        </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-16">
        <h3 className="text-2xl mb-2">Change Password</h3>
        <form onSubmit={handleUsernameChange} className="flex items-center">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="New Username"
            required
            className="w-64 px-4 py-2 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Password
          </button>
        </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default ResetData;
