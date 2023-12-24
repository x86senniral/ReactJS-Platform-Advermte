import { useState, ChangeEvent, useEffect } from 'react';
import { auth, firestore } from "../../authentication/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // When the component mounts, check if the user has an avatar already
    const currentUser = auth.currentUser;
    if (currentUser?.photoURL) {
      // If so, use that for the avatarURL state
      setAvatarURL(currentUser.photoURL);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        alert('Only image files are allowed!');
        return;
      }
      // Proceed with setting the avatar and the avatar URL
      setAvatar(file);
      setAvatarURL(URL.createObjectURL(file));
    }
  }

  const handleClick = async () => {
    if (!avatar) {
      alert("Please select an image first.");
      return;
    }

    const currentUser = auth.currentUser;
    if (currentUser) {
      const storage = getStorage();
      const avatarRef = ref(storage, `avatars/${currentUser.uid}/${avatar.name}`);
      try {
        const snapshot = await uploadBytes(avatarRef, avatar);
        const url = await getDownloadURL(snapshot.ref);

        await updateProfile(currentUser, { photoURL: url });
        setAvatarURL(url); // Update the avatarURL state with the new URL
        setSuccess('Image added successfully.');

        // Fetch the publicId from the 'usernames' collection
        const usernamesRef = doc(firestore, 'usernames', currentUser.uid);
        const docSnap = await getDoc(usernamesRef);

        if (docSnap.exists() && docSnap.data().publicId) {
          const publicId = docSnap.data().publicId;
          const userPublicProfileRef = doc(firestore, 'users_public_ids', publicId);
          await updateDoc(userPublicProfileRef, { photoURL: url });
        } else {
          setError('Unable to find public profile information.');
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error: ", error.message);
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    } else {
      alert("No user is signed in.");
    }
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow-xl">
      <input type="file" onChange={handleChange} accept="image/*" className="mb-4" />
      <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" onClick={handleClick}>
        Upload
      </button>
      <div className="relative mt-6">
        <img
          className="rounded-full border-4 border-blue-300 w-64 h-64 object-cover"
          src={avatarURL || "default-avatar-url"}
          alt="Avatar"
        />
        <div className="absolute bottom-0 right-0">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 border-4 border-white rounded-full shadow">
            <span className="text-xs">Edit</span>
          </div>
        </div>
      </div>
      {success && <div className="px-3 py-1 mt-3 text-sm text-center text-green-800 bg-green-200 rounded">{success}</div>}
      {error && <div className="px-3 py-1 mt-3 text-sm text-center text-red-800 bg-red-200 rounded">{error}</div>}
    </div>
    </>
  )
}

export default Profile;
