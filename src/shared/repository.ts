//relacionado con el acceso a la base de datos
export interface Repository<T> {
  //permite que todos los repositorios tengan estos elementos
  findAll(): T[] | undefined //devuelve o el array definido en el repositorio o un undefined. Cuando se conecte con la base de datos utilizaremos el Promise<>
  findOne(item: {id: string}): T | undefined //Al ser el parametro el id, se exige que todos los objetos si o si tengan el id no nulo
  add(item: T): T | undefined
  update(item: T): T | undefined
  delete(item: {id:string}): T | undefined
}