import React, { useState } from 'react';
import UserBar from '../UserBar';
import './css/pricing.css'
import PlanDescriptionCard from './PlanDescriptionCard';

// Define the structure for features with TypeScript interface
interface Feature {
  title: string;
  description: string;
}

interface PlanCardProps {
  planName: string;
  features: Feature[];
}

const FeatureItem: React.FC<{ feature: Feature }> = ({ feature }) => {
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);

  return (
    <div className="my-2">
      <button
        onClick={() => setIsFeatureOpen(!isFeatureOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-medium text-gray-700">{feature.title}</span>
        <svg className={`w-4 h-4 transform transition-transform ${isFeatureOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isFeatureOpen && (
        <div className="mt-2 pl-4 pr-2 text-sm text-gray-600">
          {feature.description}
        </div>
      )}
    </div>
  );
};

const PlanCard: React.FC<PlanCardProps> = ({ planName, features }) => {
    return (
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-300 shadow-lg transition duration-500 hover:shadow-xl transform hover:-translate-y-1">
        <div className="p-6">
          <h5 className="text-2xl font-bold mb-4 text-purple-600">{planName}</h5>
          <div className="mt-4">
            {features.map((feature, index) => (
              <FeatureItem key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    );
  };

const Pricing = () => {
  const planDescriptions = [
    {
      name: 'Starter Plan',
      description: "The Starter Plan is an ideal launchpad for businesses stepping into the digital realm. This plan focuses on foundational digital marketing elements to build your online presence. Key features include comprehensive Social Media Management, ensuring your brand resonates across various platforms with custom content. The Advertising feature is designed to scale your business with precision-targeted ads for maximum reach. Regular Weekly one-on-one meetings ensure personalized attention and updates on your campaign's progress. This plan is perfect for businesses looking to establish a strong online foothold."
      // Full description as provided earlier
    },
    {
      name: 'Advanced Plan',
      description: "Our Advanced Plan is tailored for growing businesses aiming to amplify their market presence significantly. It includes an aggressive Mass Advertising strategy, covering a wide range of platforms for maximum exposure. The Rebranding feature offers a creative overhaul of your brand, including your website and online store. You'll benefit from Full Website or Social Media Management Utility, ensuring a seamless digital experience. Videos & Ads Management is another highlight, providing engaging storytelling and impactful content. Weekly meetings, with additional availability, ensure close collaboration and alignment with your business goals."
      // Full description as provided earlier
    },
    {
      name: 'Professional Plan',
      description: "The Professional Plan is our most comprehensive offering, designed for businesses seeking an unparalleled level of service. It includes our most intensive advertising campaign, covering multiple platforms for exponential brand visibility. The Rebranding service in this plan is elite, offering a complete transformation of your brand's visual and digital identity. You'll receive Full Website and Social Media Management, ensuring every aspect of your online presence is professionally handled. Boosted Videos & Ads Management elevates your content strategy, creating memorable impressions."
      // Full description as provided earlier
    }
  ];
  const plans = [
    {
      name: 'Starter Plan',
      features: [
        { title: 'Social Media Management', description: 'Elevate your brand with our expert social media strategy, encompassing custom ads and posts across all platforms. Get tailored content that resonates with your audience and amplifies your presence. Platform Type: Any. (Can be discussed.)' },
        { title: 'Advertising', description: 'The most crucial part in scaling and expanding. Scale your business with precision-targeted advertising. Our expertise in diverse platforms ensures maximum reach and impact, propelling your brand to new heights.' },
        { title: 'Weekly one-on-one meetings checkup.', description: "You'll checkup with the management representative to receive thoughts, validations and updates on the current state." },
        // ... more features
      ],
    },
    {
        name: 'Advanced Plan',
      features: [
        { title: 'Mass Advertising.', description: "Ads, ads and more ads. Our sole focus will be in advertising in as many platforms as possible. Amplify your visibility with our aggressive advertising approach. We'll blanket multiple platforms to capture your audience's attention, ensuring your brand stands out in a crowded market." },
        { title: 'Rebranding.', description: "Transform your brand with our creative rebranding services. Whether it’s your website or online store, we bring fresh perspectives and innovative designs to revitalize your brand identity." },
        { title: 'Full Website OR Social Media Management Utility.', description: 'Our team expertly manages your digital presence, from dynamic website updates to engaging social media content. Experience seamless, professional management that keeps you ahead.' },
        { title: "Videos & Ads Management.", description: "Craft compelling narratives with our bespoke video and ad services. Our content creators specialize in engaging storytelling that captures attention and drives results." },
        { title: 'Weekly one-on-one meetings checkup.', description: 'Weekly check ups for content validations and questions. Including additional available meetings if required.' },
      ],
    },
    {
        name: 'Professional Plan',
      features: [
        { title: 'Highest possible advertising.', description: "More paids ads and more paid ads. Unleash the full power of advertising with our most intensive campaign strategy. Experience exponential reach and impact, as we deploy a multi-platform blitz to skyrocket your brand’s visibility." },
        { title: 'Rebranding', description: "Experience elite rebranding with our Professional Plan. This service offers a bespoke, top-tier transformation for your brand, encompassing all aspects of your visual and digital identity. From a sophisticated redesign of your logo and website to the meticulous crafting of your brand story and values, we provide a holistic approach. Our team of experts will work closely with you to understand and elevate your brand’s unique essence, ensuring it stands out with elegance and impact in the market. Ideal for businesses seeking a premium, unmatched rebranding experience." },
        { title: 'Full Website AND Social Media Management Utility,', description: 'Our team expertly manages your digital presence, from dynamic website updates to engaging social media content. Experience seamless, professional management that keeps you ahead.' },
        { title: 'Boosted Videos & Ads Management,', description: 'Elevate your marketing with high-impact video content and ads. Our enhanced services ensure your message is not just seen but remembered, leaving a lasting impression on your audience.' },
        { title: 'Weekly one-on-one meetings checkup.', description: 'Weekly check ups for content validations and questions. Including additional available meetings if required.' },
      ],
    }
  ];

  return (
    <>
    <UserBar />
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-4xl font-semibold mb-8 text-purple-700 animate-pulse">Pricing Plans</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan, index) => (
          <PlanCard key={index} planName={plan.name} features={plan.features} />
        ))}
      </div>

      <div className='mt-24 text-center'>
        <h1 className="text-3xl font-bold text-purple-700 mb-6 animate-pulse">Know which plan works out for you.</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {planDescriptions.map((plan, index) => (
            <PlanDescriptionCard key={index} name={plan.name} description={plan.description} />
          ))}
        </div>
      </div>

    </div>
    <footer className="bg-white p-4 rounded shadow w-full mt-16">
        <div className="text-center text-sm text-gray-600">
        <p>Contact us at: <a href="mailto:user@advermte.com" className="text-purple-600">user@advermte.com</a></p>
        <p>Privacy Policy | Terms of Service | FAQ</p>
      </div>
    </footer>
  </>
  );
};

export default Pricing;
