

let words: string[] = [
"GUITARRA","FINLANDIA","DINAMARCA","COMPUTADORA","LAPTOP",
"AMPLIFICADOR","ELECTRONICA","MUSICA","BATERIA","PIANO",
"METALLICA","HAMBURGUESA"];


export function getRandomWorld(){
    return words[ Math.floor( Math.random() * words.length ) ] ;
}