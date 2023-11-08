import heart from "./gameheart.png";

const LivesDisplay = ({lives}) => {
    const heartIcons = Array.from({ length: lives }, (_, index) => (
      <img src={heart} key={index} className="heartIcon" alt="heart icon"/>
    ));
    return heartIcons;
  };

export default LivesDisplay