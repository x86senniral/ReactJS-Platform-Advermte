import { useState } from 'react';
import UserBar from '../UserBar';
import AppointmentForm from './AppointmentForm';
import { Link } from 'react-router-dom';

const AdvermteSupport = () => {
  const [isAppointmentFormVisible, setIsAppointmentFormVisible] = useState(false);

  const handleBookAppointmentClick = () => {
    setIsAppointmentFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsAppointmentFormVisible(false);
  };

  return (
    <main className="bg-white min-h-screen">
      <UserBar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <section className="bg-gray-100 p-8 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Unlock Success with Advermte</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to Advermte, where your brand's potential is our passion. As a multi-faceted platform, we offer more than just advertising solutions; we deliver a transformative experience for your business. From strategic rebranding to targeted advertising and dynamic networking, our services are tailored to catapult your brand into the spotlight. With Advermte, gain access to an expansive network ready to amplify your presence and open doors to new opportunities. Our meticulous mailing services and manual advertising strategies are crafted by industry veterans, ensuring your message resonates with the right audience. Let's embark on this journey together, and watch your brand ascend to new heights of success.
          </p>
        </section>
        
        <section className="bg-gray-100 p-8 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Ready?</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Fill in our contact form and our team will get back to you.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Get Started with Advermte</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Ready to take your brand to the next level? Connect with Us to explore the multitude of advertising solutions we offer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleBookAppointmentClick}
              className="bg-blue-600 text-white text-lg px-6 py-3 rounded hover:bg-blue-700 transition-colors"
            >
              Book an Appointment
            </button>
            <button className="bg-blue-600 text-white text-lg px-6 py-3 rounded hover:bg-blue-700 transition-colors">
              <Link to='/contact'>Contact Us</Link>
            </button>
            <button className="bg-gray-300 text-gray-700 text-lg px-6 py-3 rounded hover:bg-gray-400 transition-colors">
              More
            </button>
          </div>
        </section>
      </div>
      {isAppointmentFormVisible && <AppointmentForm onClose={handleCloseForm} />}
    </main>
  );
};

export default AdvermteSupport;
