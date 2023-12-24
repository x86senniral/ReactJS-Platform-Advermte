import React, { useState, useEffect } from 'react';
import UserBar from '../UserBar';
import Popup from './Popup'; // Ensure this component accepts an onSubmit prop
import { useAuthState } from 'react-firebase-hooks/auth'; // If you're using react-firebase-hooks
import { auth, storage, firestore } from '../../authentication/firebase';
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp, deleteDoc, doc, setDoc, limit,startAfter } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactTypingEffect from 'react-typing-effect';
import { formatRelative } from 'date-fns';
import { getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';


type Post = {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
  bannerUrl: string;
  createdAt: Timestamp;
};

type FormData = {
  title: string;
  description: string;
};
type PaginationProps = {
  pages: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};


const Pagination: React.FC<PaginationProps> = ({ pages, setCurrentPage, currentPage }) => {
  console.log('Total pages:', pages);
  // Create an array of page numbers
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`page-number ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};




const UserServices = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [user, loading, error] = useAuthState(auth); // Get the current user and loading state
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const postsPerPage = 14;


  const handleCreatePost = async (formData: FormData, file: File) => {
    if (!user) {
      alert('You must be logged in to create a post.');
      return;
    }
  
    const fileRef = ref(storage, `banners/${file.name}`);
    await uploadBytes(fileRef, file);
    const bannerUrl = await getDownloadURL(fileRef);
  
    const postToSave = {
      ...formData,
      bannerUrl,
      createdAt: serverTimestamp(),
      userId: user.uid,
    };
  
    await addDoc(collection(firestore, 'posts'), postToSave);
    setShowPopup(false);
  
    // This assumes that you want to show the most recent posts after creating a new post
    setCurrentPage(1); // Reset to the first page
    await fetchPosts(); // Fetch posts without passing a page number, assuming fetchPosts will fetch the first page
  };


  const fetchPosts = async () => {
    // Determine the starting point for posts based on the current page
    const postRef = collection(firestore, 'posts');
    let q;
  
    if (currentPage === 1) {
      q = query(postRef, orderBy('createdAt', 'desc'), limit(postsPerPage));
    } else if (lastDoc) {
      q = query(postRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(postsPerPage));
    } else {
      // If we don't have a lastDoc, we just fetch the first page
      q = query(postRef, orderBy('createdAt', 'desc'), limit(postsPerPage));
    }
  
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      // Use the last visible document for the next query's cursor
      setLastDoc(lastVisible);
  
      const postsWithUsernames = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const post = docSnapshot.data() as Post;
          post.id = docSnapshot.id;
  
          // Retrieve the username using the public ID
          const publicIdDocRef = doc(firestore, 'usernames', post.userId);
          const publicIdDocSnap = await getDoc(publicIdDocRef);
  
          if (publicIdDocSnap.exists()) {
            const publicIdData = publicIdDocSnap.data();
            const usernameDocRef = doc(firestore, 'users_public_ids', publicIdData.publicId);
            const usernameDocSnap = await getDoc(usernameDocRef);
            if (usernameDocSnap.exists()) {
              const usernameData = usernameDocSnap.data();
              post.username = usernameData.username;
            }
          }
  
          return post;
        })
      );
  
      setPosts(postsWithUsernames);
    } else {
      // If there are no posts (e.g., last page was deleted), reset the lastDoc
      setLastDoc(null);
    }
  
    // Calculate the total pages if needed, using the total count of documents
    // Assuming you have a total post count stored somewhere
  };
  
  
  useEffect(() => {
    const getPostCount = async () => {
      try {
        const postCountRef = doc(firestore, 'metadata', 'postsCount');
        const postCountSnap = await getDoc(postCountRef);
        if (postCountSnap.exists() && postCountSnap.data()?.count !== undefined) {
          const totalPosts = postCountSnap.data().count;
          const totalPages = Math.ceil(totalPosts / postsPerPage);
          console.log('Total posts:', totalPosts, 'Total pages:', totalPages); // Confirming the data
          setTotalPages(totalPages);
        } else {
          console.log('No total post count available, setting pages to 0');
          setTotalPages(0);
          // If the document doesn't exist or doesn't contain the count field, log the data for debugging
          console.log('Document data:', postCountSnap.data());
        }
      } catch (error) {
        console.error('Error fetching post count:', error);
        setTotalPages(0);
      }
    };
  
    getPostCount();
  }, [postsPerPage]);
  
  
  
  
  const handleDeletePost = async (postId: string, postUserId: string) => {
    if (!user) {
      alert('You must be logged in to delete a post.');
      return;
    }
  
    if (user.uid !== postUserId) {
      alert('You can only delete your own posts.');
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(firestore, 'posts', postId));
      await fetchPosts(); // Removed the argument here
    }    
  };
  
  useEffect(() => {
    fetchPosts(); // Removed the argument here
  }, [currentPage]);
  

 

  const findOrCreateThread = async (userPublicId: string, recipientPublicId: string): Promise<string> => {
    const threadId = [userPublicId, recipientPublicId].sort().join('_');
    const threadRef = doc(firestore, 'threads', threadId);
  
    const threadSnap = await getDoc(threadRef);
    if (!threadSnap.exists()) {
      await setDoc(threadRef, {
        participants: [userPublicId, recipientPublicId],
        createdAt: serverTimestamp(),
      });
  
      // Create a notification for the recipient if the thread is new
      const recipientNotificationsRef = collection(doc(firestore, 'users', recipientPublicId), 'notifications');
      await addDoc(recipientNotificationsRef, {
        threadId: threadId,
        viewed: false,
        createdAt: serverTimestamp(), // Optional, if you want to track when the notification was created
      });
    }
  
    return threadId;
  };
  

  // Handler for the "Message" button click
  const handleMessageButtonClick = async (recipientUserId: string) => {
    if (!user) {
      console.error('User is not logged in.');
      return;
    }
  
    // Now TypeScript knows user is not null or undefined because of the check above.
    const userPublicId = user.uid; 
    const recipientPublicId = recipientUserId;
    
    // Now we pass strings to findOrCreateThread, as it expects
    const threadId = await findOrCreateThread(userPublicId, recipientPublicId);
    navigate(`/user-request/${threadId}`);
  };
  if (loading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  const formatDate = (timestamp: Timestamp) => {
    // Convert Firestore Timestamp to JavaScript Date object
    return formatRelative(timestamp.toDate(), new Date());
  };


  return (
    <>
       <UserBar />
       {/*
      <Wavify
        className="absolute top-0 w-full h-24 z-0"
        fill="#4299e1"
        paused={false}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3
        }}
      />*/}
      <div className="text-center pt-24">
        <ReactTypingEffect
          text={['Welcome to User Services!', 'Create a post...', 'Share your thoughts.']}
          speed={100}
          eraseSpeed={50}
          typingDelay={500}
          eraseDelay={1000}
        />
        <div className="text-center pb-8">
          <button
            onClick={() => setShowPopup(true)}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block my-4"
          >
            Create Post
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-16">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={post.bannerUrl} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 text-base">{post.description}</p>
              <div className="flex justify-between items-center text-sm mt-2">
                <span>by {post.username}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              {user && user.uid === post.userId && (
                <button
                  onClick={() => handleDeletePost(post.id, post.userId)}
                  className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded block ml-auto mt-4"
                >
                  Delete
                </button>
              )}
              {user && user.uid !== post.userId && (
                <button
                  onClick={() => handleMessageButtonClick(post.userId)}
                  className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded block ml-auto mt-4"
                >
                  Message
                </button>
              )}
           </div>
          </div>
        ))}
      </div>
      {showPopup && <Popup onSubmit={handleCreatePost} onClose={() => setShowPopup(false)} />}
      <div className="text-5xl">
      {totalPages > 1 && (
      <Pagination 
        pages={totalPages} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage}
      />
    )} 
    </div>
    </>
  );
};

export default UserServices;
