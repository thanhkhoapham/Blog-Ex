import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'I\'m Khoa', 500,
        'I\'m a developer', 500,
        'I\'m a adventurer', 500,
        'I\'m a coder', 500,
        'I\'m a programer', 500,
        'I\'m a supper man', 500,
        'I\'m a iron man', 500,
        'I\'m a cây cà rem', 500,
        'I\'m a bat man', 500
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;