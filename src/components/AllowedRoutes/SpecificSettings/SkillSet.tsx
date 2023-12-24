import React, { useState, useEffect } from 'react';
import { auth, firestore } from "../../authentication/firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UserSkillSet: React.FC = () => {
  const [skill, setSkill] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    const fetchSkills = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const usernamesRef = doc(firestore, 'usernames', currentUser.uid);
        const docSnap = await getDoc(usernamesRef);

        if (docSnap.exists() && docSnap.data().publicId) {
          const publicId = docSnap.data().publicId as string;
          const userPublicProfileRef = doc(firestore, 'users_public_ids', publicId);
          const userPublicProfileSnap = await getDoc(userPublicProfileRef);

          if (userPublicProfileSnap.exists() && userPublicProfileSnap.data().UserSkillSet) {
            setSkills(userPublicProfileSnap.data().UserSkillSet as string[]);
          }
        }
      }
    };

    fetchSkills();
  }, []);

  const handleSkillAddition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (skills.length >= 10) {
      setError('You can only add up to 10 skills.');
      return;
    }
    if (skill && !skills.includes(skill)) {
      const newSkills = [...skills, skill];
      setSkills(newSkills);
      setSkill('');
      persistSkills(newSkills);
    }
  };

  const persistSkills = async (newSkills: string[]) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const usernamesRef = doc(firestore, 'usernames', currentUser.uid);
      const docSnap = await getDoc(usernamesRef);

      if (docSnap.exists() && docSnap.data().publicId) {
        const publicId = docSnap.data().publicId as string;
        const userPublicProfileRef = doc(firestore, 'users_public_ids', publicId);
        
        try {
          await updateDoc(userPublicProfileRef, { UserSkillSet: newSkills });
          setSuccess('SkillSet has been updated successfully.');
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
        }
      } else {
        setError('Unable to find public profile information.');
      }
    } else {
      setError("No user is signed in.");
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    persistSkills(newSkills);
  };


  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
  {error && (
    <div className="bg-red-500 text-white p-2 rounded-md mb-4">{error}</div>
  )}
  {success && (
    <div className="bg-green-500 text-white p-2 rounded-md mb-4">{success}</div>
  )}
  <form onSubmit={handleSkillAddition} className="mb-4">
    <div className="flex">
      <input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="rounded-l-lg p-2 w-full"
        placeholder="Add a skill"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg p-2"
      >
        Add Skill
      </button>
    </div>
  </form>
  <ul>
    {skills.map((individualSkill, index) => (
      <li
        key={index}
        className="flex justify-between items-center bg-white p-2 rounded-md mb-2"
      >
        {individualSkill}
        <button
          onClick={() => removeSkill(index)}
          className="bg-red-500 hover:bg-red-600 text-white rounded p-1"
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default UserSkillSet;
