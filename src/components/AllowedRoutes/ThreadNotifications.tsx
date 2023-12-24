import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../authentication/firebase';
import {doc, collection, query, where, onSnapshot } from 'firebase/firestore';

type Notification = {
    id: string;
    threadId: string;
    userId: string; // ID of the user who initiated the thread
    username: string; // Username of the user who initiated the thread
    viewed: boolean;
  };
  

const ThreadNotifications = () => {
    const [user] = useAuthState(auth);
    const [notifications, setNotifications] = useState<Notification[]>([]);
  
    useEffect(() => {
        if (user) {
          const userNotificationsRef = collection(doc(firestore, 'users', user.uid), 'notifications');
      
          const q = query(userNotificationsRef, where('viewed', '==', false));
      
          const unsubscribeNotifications = onSnapshot(q, (snapshot) => {
            const fetchedNotifications: Notification[] = snapshot.docs.map((docSnapshot) => ({
              id: docSnapshot.id,
              ...docSnapshot.data() as Omit<Notification, 'id'>
            }));
      
            setNotifications(fetchedNotifications);
          }, console.error);
      
          return () => unsubscribeNotifications();
        }
      }, [user]);
      
  
    return (
        <div>
            <h1>Threads opened. Can be accessed at <a href="/settings"><span className='text-blue-600'>Requests / Messages.</span></a></h1>
          {notifications.length > 0 ? (
            <div className="overflow-x-auto mt-5">
              <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                  <tr className="md:table-row absolute -top-full md:static bg-gray-50">
                    <th className="block md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thread ID
                    </th>
                    <th className="block md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="block md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {notifications.map((notification) => (
                    <tr key={notification.id} className="md:table-row bg-white">
                      <td className="block md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {notification.threadId}
                      </td>
                      {/* Replace `notification.username` with the actual username field from the notification */}
                      <td className="block md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {notification.username}
                      </td>
                      <td className="block md:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* Implement your action button or link here */}
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5 text-center text-sm text-gray-500">No new notifications</div>
          )}
        </div>
      );
      
  };
  
  export default ThreadNotifications;