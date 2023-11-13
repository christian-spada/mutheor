import { useState } from 'react';

const useCardFlip = () => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const flipCard = e => {
    if (e.target.tagName !== 'I' && e.target.parentNode.tagName !== 'HEADER') {
      setIsCardFlipped(!isCardFlipped);
    }
  };

  return { isCardFlipped, flipCard };
};

export default useCardFlip;
