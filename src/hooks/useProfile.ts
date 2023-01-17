import { useState } from 'react';

const useProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return { handleModalOpen, modalOpen };
};

export default useProfile;
