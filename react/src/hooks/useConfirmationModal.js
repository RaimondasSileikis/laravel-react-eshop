import { useState } from 'react';

export const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    message: '',
    onConfirm: () => {},
  });

  const openModal = (message, onConfirm) => {
    setConfig({ message, onConfirm });
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    config,
    openModal,
    closeModal,
  };
};
