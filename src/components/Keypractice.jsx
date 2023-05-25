import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setKey, incrementCorrectKeys, incrementIncorrectKeys } from './store';
import "../components/Keyboard.css"; 
const KeyPractice = (props) => {
  let {
    currentKey,
    correctKeys,
    incorrectKeys,
    setKey,
    incrementCorrectKeys,
    incrementIncorrectKeys,
  } = props;

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [totalKeysPressed, setTotalKeysPressed] = useState(0);


  useEffect(() => {
    setStartTime(Date.now());

    // Generate a random key from the available keys
    const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setKey(randomKey);
  }, [setKey]);

  const handleKeyPress = (e) => {
    const { key } = e;

    if (key === currentKey) {
      incrementCorrectKeys();
    } else {
      incrementIncorrectKeys();
    }

    setTotalKeysPressed(totalKeysPressed + 1);

    // Generate a new random key
    const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setKey(randomKey);
  };

  const resetData=()=>{
    document.querySelector("input").value="";
   let details= document.querySelectorAll("span");
   details.forEach((s)=>{
    s.innerText="0";
   })
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= 5 * 60 * 1000) {
        clearInterval(timer);
        setEndTime(currentTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const calculateAccuracy = () => {
    if (totalKeysPressed === 0) return 0;

    const totalCorrectKeys = correctKeys + incorrectKeys;
    return (correctKeys / totalCorrectKeys) * 100;
  };

  const renderTimeRemaining = () => {
    if (endTime === 0) return null;

    const remainingTime = 5 * 60 * 1000 - (endTime - startTime);
    const seconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedTime = `${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;

    return <p>Time Remaining: {formattedTime}</p>;
  };

  return (
    <section className='container'>
      <div className='item'>
        <h1>Touch Typing</h1>
        <h2>Current Key: {currentKey}</h2>
        {renderTimeRemaining()}
        <p>Correct Keys: <span>{correctKeys}</span></p>
        <p>Incorrect Keys: <span>{incorrectKeys}</span></p>
        <p>Total Keys Pressed: <span>{totalKeysPressed}</span></p>
        <p>Accuracy: <span>{calculateAccuracy().toFixed(2)}</span> %</p>
        <p>Start typing to practice!</p>
        <input type="text" onKeyDown={handleKeyPress} />
        <button id='reset'onClick={resetData}>Reset</button>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentKey: state.currentKey,
  correctKeys: state.correctKeys,
  incorrectKeys: state.incorrectKeys,
});

const mapDispatchToProps = {
  setKey,
  incrementCorrectKeys,
  incrementIncorrectKeys,
};

export default connect(mapStateToProps, mapDispatchToProps)(KeyPractice);
