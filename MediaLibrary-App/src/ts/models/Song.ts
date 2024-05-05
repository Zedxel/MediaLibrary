import {Tag} from './Tag'

export class Song{
    constructor(name: string, coverArtPath: string, description: string, tags: Tag[]){
        this.name = name;
        this.coverArtPath = coverArtPath;
        this.description = description;
        this.tags = tags;
    }

    name: string;
    coverArtPath: string;
    description: string;
    tags: Tag[];
}