import crypto from 'node:crypto';
export class character {
    constructor(name, characterClass, infected, hp, attack, items, id = crypto.randomUUID()) {
        this.name = name;
        this.characterClass = characterClass;
        this.infected = infected;
        this.hp = hp;
        this.attack = attack;
        this.items = items;
        this.id = id;
    }
}
//# sourceMappingURL=character.js.map