import openai from './config.js';

const content = [
  "Beyond Mars: speculating life on distant planets.",
  "Jazz under stars: a night in New Orleans' music scene.",
  "Mysteries of the deep: exploring uncharted ocean caves.",
  "Rediscovering lost melodies: the rebirth of vinyl culture.",
  "Tales from the tech frontier: decoding AI ethics.",
]; 

/*
  Challenge: Pair text with its embedding
    - For each text input, create an object with 
      a 'content' and 'embedding' property
    - The value of 'content' should be the text
    - The value of 'embedding' should be the vector embedding for that text
*/

async function main() {
  const res = await openai.embeddings.create({
    model: process.env.OPENAI_MODEL,
    input: content,
  });
  
  const pairedData = content.map((text, index) => ({
    content: text,
    embedding: res.data[index].embedding,
  }));

  console.log(pairedData);
}
main();