import { Request,Response,NextFunction } from "express";
import { CharacterRepository } from "./character.repository.js";
import { character } from "./character.entity.js";
const repository = new CharacterRepository()

//el controlador es quien maneja los estados, salidas, operaciones y la comunicacion con el repositorio.

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

function findAll(req:Request,res:Response){
  res.json({data:repository.findAll()})
}

function findOne(req:Request,res:Response){
  const id = req.params.id
  const Character= repository.findOne({id})
  if(!Character){
    //es conveniente usar los return
    return res.status(404).send({message:'Character not found'})
  }
  res.json({data:Character})
}


function add(req:Request,res:Response){
  const {name,characterClass,infected,hp,attack,items} = req.body

  const postCharacter = new character(name,characterClass,infected,hp,attack,items); //elementos que recuperamos del body

  const Character = repository.add(postCharacter)
  res.status(201).send({message: 'Character created',data: postCharacter})
}

//para el update, usamos una sola funcion tanto para el put como para el patch
function update(req:Request,res:Response){
  req.body.sanitizedInput.id = req.params.id
  const Character = repository.update(req.body.sanitizedInput)
  
  //el findIndex retorna la posicion del array donde se encuentra.
  if(!character){
    res.status(404).send({message:'Character not found'})
  }
  
  res.status(200).send({message: 'Character updated successfully',data: Character})
}


function remove(req:Request,res:Response){
  //lo que se hace es primero buscar el character para luego eliminarlo
  const id = req.params.id
  const Character = repository.delete({id})

  if(!Character){
    res.status(404).send({message:'Character not found'})
  }else{
    res.status(200).send({message:'Character deleted successfully'})
  }
  
}


export{sanitizeCharacterInput, findAll, findOne, update, add, remove}