import fs from 'fs'

export const chooseRandom = (array, numItems) => {
  
  //console.log("Input array:", array);
  //if array is empty, array is 1 return the array
  if(array.length === 0 || array.length ===1){
    return array;
  }

  //if numItems is a number || num items < 1 || numItems > array.length I set numItems to a random integer between 2 and array.length
  if (numItems < 1 || numItems > array.length ){
    numItems = Math.floor(Math.random() * array.length) + 2;
  }


  //const arrayCopy = array.sort(() => Math.random() - 0.5);
  const arrayCopy = array.slice();

  // Shuffle the array
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]; // Swap elements
  }
  //console.log("shuffled array:", arrayCopy);

  
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
 
  //console.log("unique array:", uniqueArray);
 
    // If numItems is greater than the length of the array return unique array
   if (numItems > uniqueArray.length) {
    return uniqueArray;
   }
   //return unique array of length numItems
   return uniqueArray.slice(0, numItems);

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
  
  
  const questionsArray = [];
  if (!thing || Object.keys(thing).length === 0|| typeof thing !== 'object') {
    console.log("here");
    return questionsArray; // Return empty array if no object or object is empty
  }
  let currentQuestion = null;
  let currentChoices = [];
  //check if thing is an object and not null
  if(typeof thing === 'object' && thing != null){

    //FIX THIS!
    for (const key in thing) {
      if (key.startsWith('question-')) {
        if (currentQuestion !== null) {
          questionsArray.push({
            type: 'list',
            name: `question-${currentQuestion}`,
            message: thing[`question-${currentQuestion}`],
            choices: currentChoices
          });
        }
        currentQuestion = key.split('-')[1];
        currentChoices = [];
      } else if (key.startsWith(`question-${currentQuestion}-choice-`)) {
        currentChoices.push(thing[key]);
      }
    }
    
    // Push the last question into the array
    questionsArray.push({
      type: 'list',
      name: `question-${currentQuestion}`,
      message: thing[`question-${currentQuestion}`],
      choices: currentChoices
    });
  }
  console.log(questionsArray);
  return questionsArray;
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
