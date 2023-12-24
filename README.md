## About
It took me about 2 weeks to finish up most of this project. It's a full template of a react.js platform with full-authentication utlity, messaging system/Threads and creating public posts that can be seen by other users. Additionally each user has their own IDs & customizable Public profile that also can be seen by other users as well.
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

## SHOWCASE:
A couple of screenshots of how the web application looks like and operates.
- Landing Page (It's mostly animated with waves and typing libraries):
![](https://media.discordapp.net/attachments/933430357766844476/1188593700624937071/image.png?ex=659b1725&is=6588a225&hm=bd9f447ad39c34ecd496ad9b79c49a71f9eaa5e5d924f5f8fcf0aa94c0936461&=&width=1222&height=640)
![](https://media.discordapp.net/attachments/933430357766844476/1188594157611130940/image.png?ex=659b1792&is=6588a292&hm=9d3da33a549b6a7f3e62c6ac0e669ce14d38949e8b5c99f10149ce643badc803&=&width=1222&height=640)
![](https://media.discordapp.net/attachments/933430357766844476/1188594286065889280/image.png?ex=659b17b0&is=6588a2b0&hm=068e32cc2ab7331133d3cb6bae578eb77adcae9382d6f55a7887f4ebbba40b05&=&width=1222&height=640)

- Authentication Pages:
![](https://media.discordapp.net/attachments/933430357766844476/1188594523782250587/image.png?ex=659b17e9&is=6588a2e9&hm=9ba436dbc21c5ee53d23cc2109407b2b1987977bf0a747f201015c8d4d31a16d&=&width=1222&height=640)
![](https://media.discordapp.net/attachments/933430357766844476/1188594573837090866/image.png?ex=659b17f5&is=6588a2f5&hm=d12e325cd6c49db7e8d1da9f8b837c6d8cb8593f4aa559641c32d7a88bfa2baa&=&width=1222&height=640)

- Landing Page (OnLogin)
![](https://media.discordapp.net/attachments/933430357766844476/1188595193285451786/image.png?ex=659b1889&is=6588a389&hm=c7781489da78bf50015899bb1632270e9c6812393dd7922e28170ef5adac25b2&=&width=1222&height=640)

- Settings Page:
![](https://media.discordapp.net/attachments/933430357766844476/1188596381443706994/image.png?ex=659b19a4&is=6588a4a4&hm=3be415b885ab8da27376bd4d3d0b58092e303a235e09e767e32b917ebc2405d6&=&width=1222&height=640)
![](https://media.discordapp.net/attachments/933430357766844476/1188596499840507985/image.png?ex=659b19c0&is=6588a4c0&hm=f10c3a799c92f94433b9b3c3df66069984fd1a58d065632f2c6c1c140fa01b05&=&width=1222&height=640)
![](https://media.discordapp.net/attachments/933430357766844476/1188596584137621678/image.png?ex=659b19d4&is=6588a4d4&hm=98f81a5fba82b1023c625d41748fd3e93006181abc52a8d19e0c8d3ca93da598&=&width=1222&height=640)
![](https://media.discordapp.net/attachments/933430357766844476/1188596690773614592/image.png?ex=659b19ee&is=6588a4ee&hm=b996848b0e9915c498822c5e3d3a7bd8e3ececad13182bbee821f9e0ca453e3e&=&width=1222&height=640)

(I'll showcase the threads at the end)

- Public profile
![](https://media.discordapp.net/attachments/933430357766844476/1188596944117977218/image.png?ex=659b1a2a&is=6588a52a&hm=439f1b8e58679caa23e8116b32d8eabf6f636cd998ac2cb90b08b6ae0add5056&=&width=1222&height=640)

- Public posts
![](https://media.discordapp.net/attachments/933430357766844476/1188597423594016850/image.png?ex=659b1a9c&is=6588a59c&hm=e75cbc4cd63c0f10fbd5aef50d1b40664f64561783d139e1a888e13c8034108b&=&width=1222&height=640)
![](https://media.discordapp.net/attachments/933430357766844476/1188597515319250994/image.png?ex=659b1ab2&is=6588a5b2&hm=a3d8eb761c0bf300b3c2644e615336c733205a36045370f928ab19056dc3402f&=&width=1222&height=640)
The posts also have the "Post limit per page" feature.

- Pricings
Sayyyy you're building some advertising website or something you'd like to showcase, then we have:
![](https://media.discordapp.net/attachments/933430357766844476/1188598095466991697/image.png?ex=659b1b3d&is=6588a63d&hm=c5e50c88e6536db2e83b1a158ed13e690d498d3ddd14ab8a25b53969c4fd1faa&=&width=1222&height=640)

There's still more but this is the general showcase.

## THREADS / MESSAGING system showcase
Additionally, as a user, say you're browsing the "posts" page. Let's make another account:We are now logged in as "GreatApe"
![](https://media.discordapp.net/attachments/933430357766844476/1188598632388235294/image.png?ex=659b1bbd&is=6588a6bd&hm=25da7472d5bd652ff2c0535e630a0bf569500f4cec3bba036fdeed407546ad8e&=&width=1388&height=635)
Lets browse the "posts" page:
![](https://media.discordapp.net/attachments/933430357766844476/1188598799942303825/image.png?ex=659b1be5&is=6588a6e5&hm=33f8060fbd28e09e63b9617e8c05c16b01a51d2edb5236120ae3ddf09647a57c&=&width=1317&height=640)
We can now see the posts we published using our other account "VAH" and can message them about it. This is where threads comes in, on the click of the `message` button:
![](https://media.discordapp.net/attachments/933430357766844476/1188599141773885541/image.png?ex=659b1c36&is=6588a736&hm=59717882885f613065b9776700d5907c35eb68928189960ddca16ffaf1e4cbcc&=&width=1388&height=249)
Now logging back into our VAH account,
Landing Page:
![](https://media.discordapp.net/attachments/933430357766844476/1188599440567717888/image.png?ex=659b1c7d&is=6588a77d&hm=3510286cf924480e11dc0b90fdfb8070c322269f6b6b6df27e8e3f82f33ce2d1&=&width=1243&height=640)
Threads Page (settings):
![](https://media.discordapp.net/attachments/933430357766844476/1188599619945508905/image.png?ex=659b1ca8&is=6588a7a8&hm=e89530e452e6097a24123efebe32d4540c4510b02bdea81ae50f3d8b679e7cdb&=&width=1243&height=640)
We are now able to see that someone has sent us a message and therefore can simply reply:
![](https://media.discordapp.net/attachments/933430357766844476/1188599902670962818/image.png?ex=659b1ceb&is=6588a7eb&hm=540e7d658e3f276e0c96951bd474e3132974d9efb56448fc8021a48e26d1cb3d&=&width=1388&height=254)

There is still more to it but I can't cover the entire thing through screenshots. :D
