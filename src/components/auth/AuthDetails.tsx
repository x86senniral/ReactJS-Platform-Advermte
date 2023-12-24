import {useEffect, useState} from 'react'
import { auth } from '../authentication/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const AuthDetails = () => {
    const navigate = useNavigate();


   const [authUser, setAuthUser] = useState<User | null>(null);

   useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user)
            navigate('/landing');
        } else {
            setAuthUser(null);
        }
    });
    return () => {
        listen();
    }

   },[]);
   const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('Signed out successfully.');
      navigate('/signin'); // Correct usage for navigate function
    }).catch((error) => {
      console.log(error.message);
    });
  };
  
    
  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed in as ${authUser.displayName || 'No username set'} (${authUser.email})`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}
//     <div>{authUser ? <><p>{`Signed in as ${authUser.email}`}</p> <button onClick={userSignOut}>Sign Out</button></> : <p>Not signed in</p>}</div>
export default AuthDetails