import UserBar from '../UserBar';

const ContactUs = () => {
  return (
    <>
    <UserBar />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-10">
      <div className="container max-w-lg mx-auto text-center animate__animated animate__fadeIn">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="mb-8 text-gray-700">
          Have any questions? Reach out to us through our email or book a meeting directly.
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6 animate__animated animate__fadeInLeft">
            <h2 className="text-2xl font-semibold">Email Address</h2>
            <a href="mailto:contact@example.com" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              contact@example.com
            </a>
          </div>

          <div className="animate__animated animate__fadeInRight">
            <h2 className="text-2xl font-semibold mb-3">Book a Meeting</h2>
            <p className="mb-4 text-gray-600">Schedule a time to discuss your needs with us.</p>
            <a href="https://calendly.com/book-meeting" target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-500 text-white rounded-full px-6 py-3 hover:bg-indigo-600 transition-colors">
              Schedule Now
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactUs;
