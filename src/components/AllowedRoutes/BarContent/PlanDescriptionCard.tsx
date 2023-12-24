import React from 'react'



const PlanDescriptionCard: React.FC<{ name: string, description: string }> = ({ name, description }) => {
      
    return (
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out hover:-translate-y-1">
        <div className="p-6">
          <h3 className="text-2xl text-purple-600 font-bold mb-2">{name}</h3>
          <p className="text-gray-700 text-base">
            {description}
          </p>
        </div>
      </div>
    );
  };
  
export default PlanDescriptionCard