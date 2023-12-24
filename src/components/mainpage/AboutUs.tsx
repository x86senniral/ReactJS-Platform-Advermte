import './css/aboutus.css'
import Wave from 'react-wavify';
import CardStack from './CardStack'

const AboutUs = () => {
  return (
    <>

<div className="about">
  <Wave fill='url(#gradient)'
        paused={false}
        options={{
          height: 30,
          amplitude: 30,
          speed: 0.20,
          points: 5
        }}
  >
    <defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="10%" stopColor="#3c31dd" />
        <stop offset="90%" stopColor="#6b8dd6" />
      </linearGradient>
    </defs>
  </Wave>
</div>

<div className="bac flex flex-col items-center justify-center h-screen px-4 py-8 text-gray-700">
  <h1 className="text-4xl font-bold mb-6 text-center">
    Welcome to Advermte.
  </h1>
  <p className="text-justify text-lg md:max-w-3xl mb-6">
    Your innovative partner in elevating brand visibility and expanding professional networks. 
    At Advermte, we specialize in transforming businesses through strategic rebranding, 
    targeted advertising, and dynamic networking. Our platform is a hub for a multitude 
    of advertising solutions. MORE BUTTON HERE.
  </p>
 
  <p className="text-justify text-lg md:max-w-3xl mb-6">
    Advermte is the quintessential tool for anyone eager to delve into the realms of advertising and branding. 
    Whether you're an individual with a knack for marketing, an influencer seeking lucrative engagements, 
    or a corporation in pursuit of showcasing your offerings, Advermte is your gateway to success. Beyond connecting 
    parties, we at the Advermte team provide meticulous mailing services through our extensive network of partners 
    and manual advertising executed by our seasoned team of professionals. Join us in steering your brand towards 
    its next chapter of growth.
  </p>
<h1 className="text-4xl font-bold mb-6 text-center">
    Why Us?
</h1>
    <p className='text-justify text-lg md:max-w-3xl mb-6'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed ligula pulvinar, luctus erat nec, ornare enim. Morbi sed consectetur neque, sit amet blandit magna. Vestibulum feugiat congue tellus. Sed nulla orci, posuere vitae gravida molestie, blandit eu lectus. Etiam bibendum placerat est sed rutrum.
    </p>
  <h1 className="text-4xl font-bold mb-6 text-center">
    Categories.
  </h1>
  <CardStack />
</div>

    <div className="about rotated">
  <Wave fill='url(#gradient)'
        paused={false}
        options={{
          height: 30,
          amplitude: 30,
          speed: 0.20,
          points: 5
        }}
  >
    <defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="10%" stopColor="#3c31dd" />
        <stop offset="90%" stopColor="#6b8dd6" />
      </linearGradient>
    </defs>
  </Wave>
</div>
</>
    
  )
}

export default AboutUs;
