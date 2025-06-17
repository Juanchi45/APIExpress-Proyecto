import express from 'express';
import { character } from './character.js';
//Los videos del 4 al 12 de api van a ser trabajados desde esta carpeta
//agregar nuevos characters
//post /api/characters
//Como viene la data del character a agregar desde el http, se usan los middleware, fragmentos de codigo en express que modifican o procesan la request y van agregando o sacando informacion segun sea necesario. Es decir:
//user => request => express => middleware que forme el req.body. En este caso es express.json => app.post (req.body) => response => user
const app = express();
app.use(express.json());
const characters = [
    new character('Joel Miller', 'Survivor', false, 100, 20, ['Shotgun', 'Bow', 'Hunt Rifle'], 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
//$$
function sanitizeCharacterInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        characterClass: req.body.characterClass,
        infected: req.body.infected,
        hp: req.body.hp,
        attack: req.body.attack,
        items: req.body.items
    };
    //aca se hacen validaciones (tipo de dato correcto, que no haya nada malicioso)
    //este metodo es insuficiente, pero es una base para ir ampliando todo 
    //esto se usa, para si modificamos un elemento, no se haga el sanitized para las que no estan definidas
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
app.get('/api/characters', (req, res) => {
    res.json({ data: characters });
});
app.get('/api/characters/:id', (req, res) => {
    const character = characters.find((character) => character.id === req.params.id);
    if (!character) {
        res.status(404).send({ message: 'Character not found' });
    }
    res.json({ data: character });
});
/*
lo de sanitized tambien lo podemos hacer en el post

app.post('/api/characters',(req,res)=> {
  const {name,characterClass,infected,hp,attack,items} = req.body

  const postCharacter = new character(name,characterClass,infected,hp,attack,items); //elementos que recuperamos del body

  characters.push(postCharacter);
  res.status(201).send({message: 'Character created',data: postCharacter})
})
*/
/*
app.put('/api/characters/:id',(req,res)=>{
  const characterIdx = characters.findIndex(character => character.id === req.params.id)
  //el findIndes retorna la posicion del array donde se encuentra.
  if(characterIdx === -1){
    res.status(404).send({message:'Character not found'})
  }
  //manera de reasignar elementos, pero hay otra forma de mejorarlo
  const input = {
    name: req.body.name,
    characterClass: req.body.characterClass,
    infected: req.body.infected,
    hp: req.body.hp,
    attack: req.body.attack,
    items: req.body.items
  }
  characters[characterIdx]={...characters[characterIdx],...input}

  res.status(200).send({message: 'Character updated successfully',data: characters[characterIdx]})
})
*/
//ahora vamos a ver como sanatizar la entrada de los datos.
//no vamos a encargarnos de cosas como, por ejemplo, la validacion del tipo de datos, de eso se va a encargar una libreria que usaremos mas adelante.
//lo que si vamos a hacer es separar esta sanitizacion en un metodo ubicado debajo de $$
//ahora lo que vamos a hacer es modificar el input
app.put('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
    const characterIdx = characters.findIndex(character => character.id === req.params.id);
    //el findIndes retorna la posicion del array donde se encuentra.
    if (characterIdx === -1) {
        res.status(404).send({ message: 'Character not found' });
    }
    characters[characterIdx] = { ...characters[characterIdx], ...req.body.sanitizedInput };
    res.status(200).send({ message: 'Character updated successfully', data: characters[characterIdx] });
});
app.patch('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
    const characterIdx = characters.findIndex(character => character.id === req.params.id);
    //el findIndex retorna la posicion del array donde se encuentra.
    if (characterIdx === -1) {
        res.status(404).send({ message: 'Character not found' });
    }
    characters[characterIdx] = { ...characters[characterIdx], ...req.body.sanitizedInput };
    res.status(200).send({ message: 'Character updated successfully', data: characters[characterIdx] });
});
app.post('/api/characters', sanitizeCharacterInput, (req, res) => {
    const input = req.body.sanitizedInput;
    const postCharacter = new character(input.name, input.characterClass, input.infected, input.hp, input.attack, input.items); //elementos que recuperamos del body
    characters.push(postCharacter);
    res.status(201).send({ message: 'Character created', data: postCharacter });
});
app.listen(3000, () => {
    console.log('server running on http://localhost:3000/');
});
//# sourceMappingURL=api04.js.map