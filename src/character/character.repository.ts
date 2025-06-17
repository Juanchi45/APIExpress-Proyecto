import { Repository } from "../shared/repository.js";
import { character } from "./character.entity.js";

const characters= [
  new character(
    'Joel Miller',
    'Survivor',
    false,
    100,
    20,
    ['Shotgun','Bow','Hunt Rifle'],
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
] 


export class CharacterRepository implements Repository<character>{
  public findAll(): character[] | undefined {
      return characters
  }

  public findOne(item: { id: string; }): character | undefined {
      return characters.find((character)=>character.id===item.id)
  }

  public add(item: character): character | undefined {
      characters.push(item)
      return item
  }

  public update(item: character): character | undefined {
    const characterIdx = characters.findIndex(character => character.id === item.id)
    //el findIndes retorna la posicion del array donde se encuentra.
    if(characterIdx !== -1){
    characters[characterIdx]={...characters[characterIdx],...item}
    }
    return characters[characterIdx]
  }

  public delete(item: { id: string; }): character | undefined {
    const characterIdx = characters.findIndex(character => character.id === item.id)

    if(characterIdx!==-1){
      const deletedCharacters = characters[characterIdx]
      characters.splice(characterIdx,1)
      return deletedCharacters
    }
  }
}