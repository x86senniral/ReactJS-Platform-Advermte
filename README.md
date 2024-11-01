## About
A full template of a React platform with full-authentication utlity, messaging system/Threads and creating public posts that can be seen by other users. Additionally each user has their own IDs & customizable Public profile that also can be seen by other users as well. The focus on the platform is mostly based on backend. Front-end is an extremely basic design made using tailwindcss.

## Initialization.
The Initialization is as simply as initializing your firebase `firestore` and configurations:
- Register a a firebase account.
- Create your project.
- Enable "Web Application" / Create a "Web Application" in firebase settings.
- Enable the "Register with email and password" option. (Found under authentication > Sign In Methods)
- Enable Firestore Storage.

Great, now you have your own database and storage. Next step is to allow `read` and `write`, go inside your `Firestore Database` > `Rules` and change it to:
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
Then click `publish` to confirm.

## Replacements.
Now that you have everything set up, when creating your firebase project you should've been provided with your firebase configuration settings, should look something like this: 
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const storage = getStorage(app); // Initialize Firebase Storage
```
Although yours might be a little different the piece that you need to replace is `firebaseConfig` with your ACTUAL firebase configurations : 
```
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "domain",
  projectId: "project id",
  storageBucket: "storage bucket",
  messagingSenderId: "sender id",
  appId: "appID"
};
```
That's pretty much it!

## Deployment
- Install all of the required dependencies: `npm install`
- Deploy: `npm run dev`  
- Access the project at the localhost:port specified. In our case it's most likely `http://localhost:5173/` since i'm using vite.
