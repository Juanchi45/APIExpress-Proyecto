import express from 'express'
import { characterRouter } from './character/character.routes.js';

//Los videos del 4 al 12 de api van a ser trabajados desde esta carpeta

//agregar nuevos characters
//post /api/characters

//Como viene la data del character a agregar desde el http, se usan los middleware, fragmentos de codigo en express que modifican o procesan la request y van agregando o sacando informacion segun sea necesario. Es decir:
//user => request => express => middleware que forme el req.body. En este caso es express.json => app.post (req.body) => response => user

const app = express();
app.use(express.json())

//const repository = new CharacterRepository()

/*
//$$
function sanitizeCharacterInput(req: Request, res: Response, next:NextFunction){

  req.body.sanitizedInput = {
    name: req.body.name,
    characterClass: req.body.characterClass,
    infected: req.body.infected,
    hp: req.body.hp,
    attack: req.body.attack,
    items: req.body.items
  }
  //aca se hacen validaciones (tipo de dato correcto, que no haya nada malicioso)
  //este metodo es insuficiente, pero es una base para ir ampliando todo 
  
  
  //esto se usa, para si modificamos un elemento, no se haga el sanitized para las que no estan definidas
  Object.keys(req.body.sanitizedInput).forEach(key=>{
    if(req.body.sanitizedInput[key]===undefined){
      delete req.body.sanitizedInput[key];
    }
  })
  next()
}
*/

//hace que se maneje el characterRouter con las rutas que se le solicitan aca
app.use('/api/characters',characterRouter)

//funciones de CRUD
/*
app.get('/api/characters',(req,res)=>{
  res.json({data:repository.findAll()})
})

app.get('/api/characters/:id',(req,res)=>{
  const character= repository.findOne({id: req.params.id})
  if(!character){
    //tira error, pero es conveniente usar los return
    return res.status(404).send({message:'Character not found'})
  }
  res.json({data:character})
})

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

/*
app.put('/api/characters/:id',sanitizeCharacterInput,(req,res)=>{
  req.body.sanitizedInput.id = req.params.id
  const Character = repository.update(req.body.sanitizedInput)
  
  //el findIndex retorna la posicion del array donde se encuentra.
  if(!character){
    res.status(404).send({message:'Character not found'})
  }
  
  res.status(200).send({message: 'Character updated successfully',data: Character})
})

app.patch('/api/characters/:id',sanitizeCharacterInput,(req,res)=>{
  req.body.sanitizedInput.id = req.params.id
  const Character = repository.update(req.body.sanitizedInput)
  
  //el findIndex retorna la posicion del array donde se encuentra.
  if(!character){
    res.status(404).send({message:'Character not found'})
  }
  
  res.status(200).send({message: 'Character updated successfully',data: Character})
})

app.post('/api/characters',sanitizeCharacterInput, (req,res)=> {
  const input = req.body.sanitizedInput

  const postCharacter = new character(input.name,input.characterClass,input.infected,input.hp,input.attack,input.items) //elementos que recuperamos del body

  const Character = repository.add(postCharacter)
  res.status(201).send({message: 'Character created',data: postCharacter})
})

app.delete('/api/characters/:id',(req,res)=>{
  //lo que se hace es primero buscar el character para luego eliminarlo
  const id = req.params.id
  const Character = repository.delete({id})

  if(!Character){
    res.status(404).send({message:'Character not found'})
  }else{
    res.status(200).send({message:'Character deleted successfully'})
  }
  
})
*/

app.use((_,res)=>{
  return res.status(404).send({message:'Resource not found'});
});

app.listen(3000, ()=>{
  console.log('server running on http://localhost:3000/')
})