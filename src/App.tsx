import MainComponents from './components/mainpage/MainComponents';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import SignIn from './components/auth/SignInPage';
import SignUp from './components/auth/SignUpPage';
import LandingPage from './components/AllowedRoutes/LandingPage';
import {useEffect, useState} from 'react';
import { auth } from './components/authentication/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import RequireAuth from './components/auth/RequiredAuth';
import { User } from 'firebase/auth';
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import UserSettings from './components/AllowedRoutes/UserSettings';
import PublicProfile from './components/AllowedRoutes/BarContent/PublicProfile';
import NotFound from './components/mainpage/NotFound';
import UserServices from './components/AllowedRoutes/BarContent/UserServices';
import UserRequest from './components/AllowedRoutes/SpecificSettings/UserRequest';
import AdvermteSupport from './components/AllowedRoutes/BarContent/AdvermteSupport';
import Pricing from './components/AllowedRoutes/BarContent/Pricing';
import ContactUs from './components/AllowedRoutes/BarContent/ContactUs';
import ThreadNotifications from './components/AllowedRoutes/ThreadNotifications';

function App() {
  
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // After setting the persistence, then set up the auth state listener
      return onAuthStateChanged(auth, user => {
        setAuthUser(user);
        setIsLoading(false); // Set loading to false once user is retrieved or confirmed not logged in
      });
    })
    .catch((Error) => {
      console.error("Error with persistence setting:", Error);
      setIsLoading(false); // Also set loading to false if there was an error
    });


    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; // Or some loading spinner
  }
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<MainComponents />} />
      <Route path="/home" element={<MainComponents />} />
      <Route path="/404" element={<NotFound />} />
      {/*Restricted Routes.*/}
      <Route
          path="/landing"
          element={
            <RequireAuth authUser={authUser}>
              <LandingPage authUser={authUser} />
            </RequireAuth>
          }
        />
      <Route
          path="/settings"
          element={
            <RequireAuth authUser={authUser}>
              <UserSettings />
            </RequireAuth>
          }
        />
    <Route
      path="/profile/:publicUserId"
      element={
        <RequireAuth authUser={authUser}>
          <PublicProfile />
        </RequireAuth>
      }
    />      

<Route path="/services" element={
            <RequireAuth authUser={authUser}>
              <UserServices />
            </RequireAuth>
          }/>
          <Route path="/user-request/:threadId" element={
            <RequireAuth authUser={authUser}>
              <UserRequest />
            </RequireAuth>
          }/>
    
    <Route
      path="/th"
      element={
        <RequireAuth authUser={authUser}>
          <ThreadNotifications />
        </RequireAuth>
      }
    />  
      <Route path="/adservice" element={<AdvermteSupport />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
    </BrowserRouter>
      
      </>
  );
}

export default App;
