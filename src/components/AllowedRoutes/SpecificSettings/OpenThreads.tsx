import  { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../authentication/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

type Thread = {
    id: string;
    participants: string[];
    username: string; // Username of the other participant
  };
  

const OpenThreads = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
          const fetchThreads = async () => {
            const q = query(collection(firestore, 'threads'), where('participants', 'array-contains', user.uid));
            const querySnapshot = await getDocs(q);
    
            const threadsPromises = querySnapshot.docs.map(async (docSnapshot) => {
              const threadData = docSnapshot.data() as Thread;
              const otherParticipantUUID = threadData.participants.find((uid) => uid !== user.uid); // UUID of the other participant
              if (otherParticipantUUID) {
                // Fetch the public ID associated with the UUID
                const publicIdRef = collection(firestore, 'usernames'); // Assuming 'usernames' collection has documents with UUID as doc ID and contains publicId field
                const publicIdQuery = query(publicIdRef, where('uid', '==', otherParticipantUUID));
                const publicIdSnap = await getDocs(publicIdQuery);
                const publicIdDoc = publicIdSnap.docs[0]; // Take the first document assuming UUIDs are unique
                if (publicIdDoc) {
                  const publicIdData = publicIdDoc.data();
                  const publicId = publicIdData.publicId;
                  // Now fetch the username using the public ID
                  const usernameRef = doc(firestore, 'users_public_ids', publicId); // Now using public ID to get username
                  const usernameSnap = await getDoc(usernameRef);
                  if (usernameSnap.exists()) {
                    const usernameData = usernameSnap.data();
                    return {
                      id: docSnapshot.id,
                      participants: threadData.participants,
                      username: usernameData.username,
                    };
                  }
                }
              }
              return { id: docSnapshot.id, participants: threadData.participants, username: 'Unknown User' };
            });
    
            const resolvedThreads = await Promise.all(threadsPromises);
            setThreads(resolvedThreads.filter(thread => thread.username)); // Filter out threads without a username
          };
    
          fetchThreads();
        }
      }, [user]);
  

  const handleOpenThread = (threadId: string) => {
    navigate(`/user-request/${threadId}`);
  };

  return (
    <div>
      {threads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thread ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {threads.map((thread) => (
                <tr key={thread.id} className="bg-white">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{thread.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{thread.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenThread(thread.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No open threads</div>
      )}
    </div>
  );
};

export default OpenThreads;
