import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { firestore } from "../../authentication/firebase";
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import UserBar from '../UserBar';


const PublicProfile = () => {
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);
  const [currentUsername, setCurrentUsername] = useState('');
  const [userDescription, setUserDescription] = useState(''); // State to hold the user description
  const [userExists, setUserExists] = useState(true); // New state to track if user exists
  const { publicUserId } = useParams(); // Retrieve the public user ID from the URL
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [searchUsername, setSearchUsername] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      if (publicUserId) {
        const userDocRef = doc(firestore, 'users_public_ids', publicUserId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserPhotoURL(userData.photoURL); // This assumes the avatar URL is stored in Firestore
          setCurrentUsername(userData.username);
          setUserDescription(userData.UserDescription || 'This user has not provided a description.');
          
          // Fetch and set the user's skills directly from the database
          const userSkills = userData.UserSkillSet || [];
          setSkills(userSkills);
        } else {
          setUserExists(false); // Set to false if user data does not exist
        }
      }
    };

    fetchUserData();
  }, [publicUserId]);

  if (!userExists) {
    // Render a message or redirect to a 404 component
    return <Navigate to="/404" replace />;
  }

  const toggleDescription = () => {
    setIsFullDescriptionShown(prevState => !prevState);
  };
  
  const handleSearchByUsername = async () => {
    // Query Firestore for a document where the username matches `searchUsername`
    const usersRef = collection(firestore, 'users_public_ids');
    const q = query(usersRef, where('username', '==', searchUsername.trim()));
  
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        // Redirect to the found user's public profile page
        window.location.href = `/profile/${doc.id}`;
      });
    } else {
      // Handle the case where no matching username is found
      alert('User not found');
    }
  };
  
  return (
    <>
      <UserBar />
      <div className="flex justify-center items-center my-4">
  <div className="flex border-2 border-gray-200 rounded">
    <input
      className="px-4 py-2 w-80 rounded-l bg-white text-sm text-gray-700 leading-tight focus:outline-none"
      type="text"
      placeholder="Search by username"
      value={searchUsername}
      onChange={(e) => setSearchUsername(e.target.value)}
    />
    <button
      className="px-4 rounded-r bg-blue-500 text-white font-bold p-2 uppercase border-blue-500 border-t border-b border-r"
      onClick={handleSearchByUsername}
    >
      Search
    </button>
  </div>
</div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-center">
            {userPhotoURL ? (
              <img
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                src={userPhotoURL}
                alt="User Avatar"
              />
            ) : (
              <img
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                src="https://i.pinimg.com/236x/dd/d8/6c/ddd86ca4e101455fce5a4645f80bcdbb.jpg" // Your default avatar image
                alt="Default Avatar"
              />
            )}
           </div>
        <h1 className="text-3xl font-bold mt-4 text-center">{currentUsername}</h1>
        <div className={`text-lg mt-2 ${!isFullDescriptionShown && 'line-clamp-5'}`}>{userDescription || 'No description provided.'}</div>
        {userDescription && userDescription.split(' ').length > 100 && (
          <button 
            onClick={toggleDescription} 
            className="text-blue-200 hover:text-blue-100 mt-2"
          >
            {isFullDescriptionShown ? 'Show Less' : 'Show More'}
          </button>
        )}
        <div className="mt-4">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl font-semibold">Skills</span>
              <span className="text-lg">{skills.join(', ')}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-xl font-semibold">Email:</span>
              <span className="text-lg">user@example.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default PublicProfile;
