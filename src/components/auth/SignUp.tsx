import { useState, FormEvent } from 'react';
import { auth, firestore } from '../authentication/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';


const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const generateUniqueID = () => {
    // Generate a random alphanumeric string (you can adjust the length as needed)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 10;
    let id = '';
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  };

  const SignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username must only contain letters, numbers, and underscores.');
      return;
    }

    // Check if the username is already taken
    const usernameRef = doc(firestore, 'usernames', username.toLowerCase());
    const docSnap = await getDoc(usernameRef);

    if (docSnap.exists()) {
      // Username is taken, handle the error
      setError('This username is already taken.');
      return;
    }

    // Generate a unique ID for the user
    let uniqueID = generateUniqueID();

    // Check if the generated ID already exists
    let idRef = doc(firestore, 'users_public_ids', uniqueID);
    let idDocSnap = await getDoc(idRef);

    while (idDocSnap.exists()) {
      // If the generated ID already exists, generate a new one until it's unique
      uniqueID = generateUniqueID();
      idRef = doc(firestore, 'users_public_ids', uniqueID);
      idDocSnap = await getDoc(idRef);
    }

    // If username is not taken and unique ID is generated, proceed with creating the user
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const firebaseUID = userCredential.user.uid;
  // Don't generate a new ID here, use the one from above.
  
  // Store the username with both UID and publicId in 'usernames' collection
  const usernameRef = doc(firestore, 'usernames', firebaseUID);
  await setDoc(usernameRef, { uid: firebaseUID, publicId: uniqueID });
  
  // Store the unique ID with the username in 'users_public_ids' collection
  const publicIdRef = doc(firestore, 'users_public_ids', uniqueID);
  await setDoc(publicIdRef, { username: username });
  
      // Update the display name of the Firebase Auth user
      await updateProfile(userCredential.user, { displayName: username });
  
      // Navigate to the landing page after successful registration
      navigate('/landing');
    })
    .catch((error) => {
      // Handle errors for user creation
      setError(error.message);
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <form className="space-y-6" onSubmit={SignUp}>
          <h1 className="text-xl font-bold text-center">Sign Up</h1>
          <h2 className="disable text-red-600"></h2>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder='Email'
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder='Password'
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              placeholder='Your Username'
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
