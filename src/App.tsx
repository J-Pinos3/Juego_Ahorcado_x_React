import {useEffect ,useState} from 'react'
import {letters} from './helpers/letters';
import {HangImage} from './components/HangImage';
import {getRandomWorld} from './helpers/getRandomWorld';
import './App.css';

function App() {
  
  const [word, setWord] = useState(getRandomWorld());
  const [hiddenWord, setHiddenWord] =  useState("_ ".repeat(word.length));
  const [attempts, setAttempts ] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  /*DETERMINA SI LA PERSONA PIERDE*/
  useEffect( () => {
    
    if(attempts == 9){
      setLose(true);
    }

  },[attempts]);


  /*DETERMINA SI LA PERSONA GANA*/
  useEffect(()=>{

    const currentHiden = hiddenWord.split(" ").join("");
    if(currentHiden === word){
      setWon(true)
    }
  },[hiddenWord]);


  const checkLetter = (letter: string) =>{
    
    if(lose){return;}
    if(won){return;}

    if( !word.includes(letter) ){
      setAttempts( Math.min(attempts+1, 9)  );
      return ;
    }

    const hiddenArray = hiddenWord.split(" ");
    console.log(hiddenArray);

    for(let i = 0; i < word.length; i++){
      if( word[i] === letter ){
        hiddenArray[i] = letter;
      }
    }
    
    setHiddenWord(hiddenArray.join(" "));
  }

  const newGame = () =>{

    const newWord = getRandomWorld();

    setWord(newWord);
    setHiddenWord("_ ".repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className="App">
        
        {/*IMÁGENES*/}
        <HangImage imageNumber={attempts} />

        {/*PALABRA OCULTA*/}
        <h3>{hiddenWord}</h3>

        {/*INTENTOS*/}
        <h3>Intentos: {attempts}</h3>

        {/*RESULTADO perdida*/ }
        {
          (lose) ?
          <h2>Perdió, la palabra oculta era {word}</h2>
          : ""
        }

        {/*RESULTADO victoria*/ }
        {
          (won) ?
          <h2>Felicidades!!!, la palabra oculta era {word}</h2>
          : ""
        }

        {/*BOTONES DE LETRAS*/}
        {
          letters.map( (letter) => (
            <button onClick={() => checkLetter(letter)} key={letter}>
              {letter}
              </button>
          ))
        }

        <br /><br />
        <button onClick={ newGame } >
          ¿Nuevo Juego?
        </button>


    </div>

  );
}

export default App
