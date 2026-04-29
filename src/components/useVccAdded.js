import { useState } from 'react';

/**
 * Tracks whether the user has clicked to add a VCC package repo.
 * Marks as added on click — simple and predictable.
 */
export const useVccAdded = () => {
  const [added, setAdded] = useState({});

  const handleClick = (id) => {
    setAdded(prev => ({ ...prev, [id]: true }));
  };

  return { added, handleClick };
};
