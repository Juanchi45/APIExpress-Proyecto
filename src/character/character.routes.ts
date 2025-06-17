import { Router } from "express";
import { sanitizeCharacterInput,findAll,findOne} from "./character.controler.js";

export const characterRouter = Router()

characterRouter.get('/', findAll)
characterRouter.get('/:id', findOne)