import './css/terminus.css';
import ReactTypingEffect from 'react-typing-effect';

const Terminus = () => {
  return (
    <main className="terminal">
      {/* ... other parts of your component */}
      <div className="terminal-window">
        <p className="terminal-content">$</p>
        <ReactTypingEffect
  text={[
    ' Advertme. \n$ Inovation. \n$ Security. \n$ Scaling. \n$ Expansion.',
    'About Us:'
  ]}
  speed={70}
  eraseSpeed={70}
  typingDelay={500}
  eraseDelay={1500}
  displayTextRenderer={(text) => {
    return (
      <span>
        {text.split('\n').map((line, index) => {
          return <span key={index}>{line}<br/></span>
        })}
      </span>
    );
  }}
/>

        {/* You can add more <p> tags for more content or commands here */}
      </div>
    </main>
  );
}

export default Terminus;
