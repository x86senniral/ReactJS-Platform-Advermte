import React, { useState } from 'react';
import UserBar from './UserBar';
import Profile from './SpecificSettings/Profile';
import ResetData from './SpecificSettings/ResetData';
import Description from './SpecificSettings/Description';
import SkillSet from './SpecificSettings/SkillSet';
import OpenThreads from './SpecificSettings/OpenThreads';

// Define a type for the category
type CategoryType = 'Profile' | 'Description' | 'Reset Data' | 'SkillSet' | 'Threads';

const UserSettings: React.FC = () => {
  const [category, setCategory] = useState<CategoryType>('Profile');

  const handleCategoryChange = (newCategory: CategoryType) => {
    setCategory(newCategory);
  };

  const renderSettingsContent = () => {
    switch (category) {
      case 'Profile':
        return <Profile />
      case 'Description':
        return <Description />
      case 'Reset Data':
        return <ResetData />
      case 'SkillSet':
        return <SkillSet />
        case 'Threads':
          return <OpenThreads />
      default:
        return <div>Select a Category</div>;
    }
  };

  return (
    <>
      <UserBar />
      <main className="flex mt-20  h-screen">
        <div className="w-64 bg-white border border-gray-200 rounded-lg p-4 shadow-md mr-8">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <div onClick={() => handleCategoryChange('Profile')} className={`block text-lg ${category === 'Profile' ? 'text-blue-800' : 'text-blue-600'} hover:text-blue-800 cursor-pointer`}>Profile</div> 
          <div onClick={() => handleCategoryChange('Description')} className={`block text-lg ${category === 'Description' ? 'text-blue-800' : 'text-blue-600'} hover:text-blue-800 cursor-pointer`}>Description</div> 
          <div onClick={() => handleCategoryChange('Reset Data')} className={`block text-lg ${category === 'Reset Data' ? 'text-blue-800' : 'text-blue-600'} hover:text-blue-800 cursor-pointer`}>Reset Data</div>
          <div onClick={() => handleCategoryChange('SkillSet')} className={`block text-lg ${category === 'SkillSet' ? 'text-blue-800' : 'text-blue-600'} hover:text-blue-800 cursor-pointer`}>SkillSet</div>
          <div onClick={() => handleCategoryChange('Threads')} className={`block text-lg ${category === 'Threads' ? 'text-blue-800' : 'text-blue-600'} hover:text-blue-800 cursor-pointer`}>Requests / Messages</div> 
        </div>
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
          {renderSettingsContent()}
        </div>
      </main>
    </>
  );
};

export default UserSettings;
