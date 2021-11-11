import React from 'react';
import Button from '@material-mui/Button';
import { useConfirm } from 'material-ui-confirm';
import axios from 'axios';
import { useParams } from 'react-router';

const Item = () => {
	const id = useParams();
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({ description: 'Czy na pewno?' })
      .then(() => axios.delete(`https://fakestoreapi.com/products/${id}`))
      .catch(() => console.log("error"));
  };

  return (
    <Button onClick={handleClick}>
      Usuń
    </Button>
  );
};

export default Item;