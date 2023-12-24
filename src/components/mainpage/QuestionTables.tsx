import { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/tables.css';

const QuestionTables = () => {
  // Set initial state for toggles
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is Advertme?',
      answer: 'Advertme connects businesses and individuals with a wide range of services...',
    },
    {
      question: 'How can I join Advertme?',
      answer: 'Joining Advertme is simple. Just sign up...',
    },
    {  
      question: 'How safe and trustworthy is Advertme?',
      answer: 'At Advertme, the security of our platform and the trust of our community are our top priorities. We have implemented robust security measures to ensure that all interactions and transactions are conducted safely. While we are currently in the process of securing sponsorships to further endorse our platform, we offer transparency in all our dealings. For those who require more information or wish to address specific concerns, we are open to scheduling meetings for reassurance. Moreover, you can learn about our safety protocols on our dedicated security page at ',
    },
    // Add more FAQs here
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <h1 className='text-center'>FAQs</h1>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <p className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
            </p>
            <div className={`faq-answer ${activeIndex === index ? 'visible' : ''}`}>
              {faq.answer}
              {index === 2 && // Assuming this is the third item in your array
                <Link to="/security">Advertme Security</Link>
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionTables;
