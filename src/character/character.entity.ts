import crypto from 'node:crypto'

export class character{
  constructor(
    public name:string,
    public characterClass:string, 
    public infected:boolean, 
    public hp:number, 
    public attack:number, 
    public items:string[],
    public id= crypto.randomUUID()
  ){}
}