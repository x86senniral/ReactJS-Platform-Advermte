import './css/cardstack.css';
import fox from './images/fox.gif';

const CardStack = () => {
  return (
    <div className="stacker">
      <div className="center">
        <div className="article-card">
          <div className="content">
            <p className="date">worried?</p>
            <p className="title">Security</p>
          </div>
          <img src={fox} alt="article-cover" />
        </div>

        <div className="article-card">
          <div className="content">
            <p className="date">Trouble?</p>
            <p className="title">Rebranding</p>
          </div>
          <img src={fox} alt="article-cover" />
        </div>

        <div className="article-card">
          <div className="content">
            <p className="date">Expand?</p>
            <p className="title">Advertising</p>
          </div>
          <img src={fox} alt="article-cover" />
        </div>

      </div>
    </div>
  );
}

export default CardStack;
