import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Key from './Keypractice';
import { setActiveKey } from '../actions';

const Keyboard = () => {
  const activeKey = useSelector((state) => state.activeKey);
  const dispatch = useDispatch();

  const handleKeyClick = (character) => {
    dispatch(setActiveKey(character));
  };

  const characters = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

  return (
    <div className="keyboard">
      {characters.map((character) => (
        <Key
          key={character}
          character={character}
          isActive={activeKey === character}
          onClick={handleKeyClick}
        />
      ))}
    </div>
  );
};

export default Keyboard;
