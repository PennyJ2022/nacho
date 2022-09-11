import React from 'react'
import './Slide.css'

const letters = [["A", "B", "C", "D"],
  ["E", "F", "G", "H"],
  ["I", "J", "K", "L", "M", "N"],
  ["O", "P", "Q", "R", "S", "T"],
  ["U", "V", "W", "X", "Y", "Z"],
  ["SPC"]];
const delay = 3000;

function isActive(activeRow, activeCol, rowIndex, colIndex, rowSelected) {
  if (rowSelected) {
    if (activeRow === rowIndex && activeCol === colIndex) {
      return "slide active";
    } else {
      return "slide";
    }
  } else {
    if (activeRow === rowIndex && 0 === colIndex) {
      return "slide active";
    } else {
      return "slide";
    }
  }
}

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef(index);
  indexRef.current = index;
  const [subIndex, setSubIndex] = React.useState(0);
  const subIndexRef = React.useRef(subIndex);
  subIndexRef.current = subIndex;
  const [rowSelected, setRowSelected] = React.useState(false);
  const rowSelectedRef = React.useRef(rowSelected);
  rowSelectedRef.current = rowSelected;
 
  const [output, setOutput] = React.useState('');
  const outputRef = React.useRef(output);
  outputRef.current = output;

  React.useEffect(() => {
    setTimeout(
      () => {
        if (rowSelected) {
          setSubIndex((prevSubIndex) => 
            prevSubIndex === letters[index].length - 1 ? 0 : prevSubIndex + 1
          );
          subIndexRef.current = subIndex;
          if (subIndex === 0) {
              setRowSelected(false);
          }
        } else {
          setIndex((prevIndex) => 
            prevIndex === letters.length - 1 ? 0 : prevIndex + 1
          );
          indexRef.current = index;
          setSubIndex(0);
          subIndexRef.current = subIndex;
        }
      },
      delay
    );
    return () => {};
  }, [index, subIndex, rowSelected]);

  React.useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (rowSelectedRef.current) {
          var newLetter = '';
          if (letters[`${indexRef.current}`][`${subIndexRef.current}`] === 'SPC') {
             newLetter = '\xa0';
          } else {
             newLetter = letters[`${indexRef.current}`][`${subIndexRef.current}`];
          }
          setOutput(`${outputRef.current}`+newLetter);
          setIndex(0);
          setSubIndex(0);
        }
        else {
          setRowSelected(true);
        }
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div className="slideshow">
      {letters.map((letterRow, ridx) => (
        <div className="row" key={ridx} >
          {letterRow.map((letter, idx) => (
            <div className={isActive(index, 0, ridx, idx, false)} key={idx} > {letter} </div>
          ))}
        </div>
      ))}
      <div>{output}</div>
    </div>

  );
}

export default Slideshow 
