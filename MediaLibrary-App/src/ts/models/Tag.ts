import { Color } from 'quasar';

export class Tag{
    constructor(text: string, description: string, sydonyms: string[], displayColour: Color, isInherited: boolean, children: Tag[], parents: Tag[]){
        this.text = text;
        this.description = description;
        this.sydonyms = sydonyms;
        this.displayColour = displayColour;
        this.isInherited = isInherited;

        
        this.children = children;
        this.parents = parents;
    }

    text: string;
    description: string;
    sydonyms: string[];
    displayColour: Color;
    isInherited: boolean;
    children: Tag[];
    parents: Tag[];
}