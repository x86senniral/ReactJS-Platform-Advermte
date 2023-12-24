import  { useState, FormEvent } from 'react';
import { auth } from '../authentication/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = () => {

  const navigate = useNavigate(); // Initialize navigate function

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email , password).then((userCredentials) => {
        console.log(userCredentials)
        navigate('/landing');
      })
      .catch((Error) => {
        if (Error.code == 'auth/user-disabled'){
          console.log('The user account has been disabled.');
          const elements = document.getElementsByClassName('disable');
          if (elements.length > 0) {
            const h1Element = elements[0] as HTMLHeadingElement; // Cast to specific element type
            h1Element.textContent = 'The account has been disabled. Check your email.';
          }
        } else{
        console.log(Error);
        }
      })
    }
  return (
    <>
     <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <form className="space-y-6" onSubmit={signIn}>
                <h1 className="text-xl font-bold text-center">Log In</h1>
                <h2 className='disable text-red-600'></h2>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input id="email" type="email" placeholder='Email' required
                           className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                           value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <input id="password" type="password" placeholder='Password' required
                           className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                           value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Log In
                </button>
            </form>
        </div>
	</div>
    </>
  )
}

export default SignIn