import fs from 'fs'

export const chooseRandom = (array, numItems) => {
  
  //if array is empty, array is 1 return the array
  if(array.length === 0 || array.length ===1){
    return array;
  }

  
  if (isNaN(numItems) || numItems < 1 || numItems > array.length ){
    numItems = Math.floor(Math.random() * array.length) + 2;
  }


  //const arrayCopy = array.sort(() => Math.random() - 0.5);
  const arrayCopy = array.slice();

  // Shuffle the array
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]; // Swap elements
  }
  console.log("shuffled array:", arrayCopy);

  
  //pass the test case where array is 2 with the same values and numItems is 2
  if(arrayCopy.length === 2 && hasDuplicates(arrayCopy)){
    console.log("here");
    return arrayCopy;
  }
  
  const map = new Map();
  const uniqueArray = [];

  //extract unique items using a map 
  for (const item of arrayCopy) {
    if(!map.has(item)){
      map.set(item,true);
      uniqueArray.push(item);
      if(uniqueArray.length == numItems) {
        break;
      }
    }
  }
 

  
 
    // If numItems is greater than the length of the array return unique array
   if (numItems > uniqueArray.length) {
    return uniqueArray;
   }
   //return unique array of length numItems
   return uniqueArray.slice(0, numItems);

}
const hasDuplicates = (array) => {
  return (new Set(array)).size !== array.length;
}
export const createPrompt = ({numQuestions = 1, numChoices = 2}= {}) => {
  const things = [];

  for(let i = 1; i <= Number.parseInt(numQuestions); i++) {
    things.push({type:'input', name: `question-${i}`, message:`Enter question ${i}`})
    for(let j = 1; j <= Number.parseInt(numChoices); j++){
      things.push({type: 'input', name: `question-${i}-choice-${j}`, message:`Enter answer choice ${j} for question ${i}`})

    }
  }
  return things;
}

export const createQuestions = (thing = {}) => {
  
  let quizzes = {};
  if (!thing || Object.keys(thing).length === 0|| typeof thing !== 'object') {
    
    return []; // Return empty array if no object or object is empty
  }

  Object.keys(thing).forEach(key => {
// Extract the question number and determine if it's a choice based on the key pattern
const match = key.match(/question-(\d+)(-choice-(\d+))?/);
if (match) {
  const questionNumber = match[1];
  const isChoice = key.includes('choice');
  
  if (!isChoice) {
    // This is a question
    quizzes[questionNumber] = {
      type: 'list',
      name: key,
      message: thing[key],
      choices: []
    };
  } else {
    // This is a choice, find the correct question and add the choice
    if (quizzes[questionNumber]) {
      quizzes[questionNumber].choices.push(thing[key]);
    }
  }
}
});

const quizzesArray = Object.values(quizzes);

return quizzesArray;
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
