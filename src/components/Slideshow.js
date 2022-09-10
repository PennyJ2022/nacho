import React from 'react'
import './Slide.css'

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "SPC", "DEL"];
const delay = 5000;

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef(index);
  indexRef.current = index;
  const [output, setOutput] = React.useState('');
  const outputRef = React.useRef(output);
  outputRef.current = output;

  React.useEffect(() => {
    setTimeout(
      () => {
        setIndex((prevIndex) => 
          prevIndex === letters.length - 1 ? 0 : prevIndex + 1
        );
        indexRef.current = index;
      },
      delay
    );
    return () => {};
  }, [index]);

  React.useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key);
      if (event.key === 'Enter') {
        event.preventDefault();
        setOutput(`${outputRef.current}`+letters[`${indexRef.current}`]);
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div className="slideshow">
      <div className="slideshowSlider">
        {letters.map((letter, idx) => (
          <div className={`slide${index === idx ? " active" : ""}`} key={idx} > {letter}</div>
        ))}
      </div>
      <div>{output}</div>
    </div>

  );
}

export default Slideshow 
