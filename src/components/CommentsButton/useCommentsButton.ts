import React from 'react'

export const useCommentsButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleComments = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleComments, setIsOpen };
};
