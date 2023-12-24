import { useState, useEffect } from 'react';
import './prcss/userbar.css'
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth , firestore } from '../authentication/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate at the top of your file

export default function UserBar() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    //for userid
    const [publicUserId, setPublicUserId] = useState('');

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uidDocRef = doc(firestore, 'usernames', user.uid);
          const uidDocSnap = await getDoc(uidDocRef);
    
          if (uidDocSnap.exists()) {
            setPublicUserId(uidDocSnap.data().publicId);
          } else {
            console.log("No such document with the given UID!");
          }
        }
      });
    
      // Return the unsubscribe function directly
      return unsubscribe;
    }, []);
    
    
    const handleProfileClick = () => {
      if(publicUserId) {
        navigate(`/profile/${publicUserId}`); // Navigate to the profile page with the public user ID
      }
    };
  
  {/*
{userUniqueID && <p>Your unique ID is: {userUniqueID}</p>}
*/}
  return (

    <>
     <nav className="bg-transparent-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="hidden md:flex items-center">
            <Link to="/landing" className="mr-24 hv nav-item py-4 px-2 text-black">Landing</Link>
            <Link to="/home" className="mr-24 hv nav-item py-4 px-2 text-black">Home</Link>
            <a onClick={handleProfileClick} className="mr-24 hv nav-item py-4 px-2 text-black" role="button" style={{ cursor: 'pointer' }}>Profile</a>
            <Link to='/services' className="mr-24 hv nav-item py-4 px-2 text-black">Posts</Link>
            <Link to='/adservice' className="mr-24 hv nav-item py-4 px-2 text-black">StartHere</Link>
            <Link to="/pricing" className="mr-24 hv nav-item py-4 px-2 text-black">Pricing</Link>
            <Link to="/settings" className="hv nav-item py-4 px-2 text-black">Settings</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Home</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">About</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Services</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Contact</a>
      </div>
    </nav>
    </>
  )
}
