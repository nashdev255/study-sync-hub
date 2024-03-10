'use client';

import { useState } from 'react';
import { Button, Container } from '@mui/material';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '40%',
  },
};

const Progress = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className='w-full justify-center'>
        <Container maxWidth="sm">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            <h2 className='font-bold'>
              進捗を生やす！！！
            </h2>
          </Button>
          <Modal isOpen={modalIsOpen} style={customStyles}>
            
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default Progress;
