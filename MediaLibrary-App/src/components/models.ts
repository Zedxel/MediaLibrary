import { Color } from 'quasar';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export class Song{
  constructor(name: string, coverArtPath: string, description: string, tags: Tag[]){
      this.name = name;
      this.coverArtPath = coverArtPath;
      this.description = description;
      this.tags = tags;
  }

  public name: string;
  public coverArtPath: string;
  public description: string;
  public tags: Tag[];
}

export class Tag{
  constructor(text: string, description: string, sydonyms: string[], displayColour: Color, isInherited: boolean, children: (string | Tag)[], parents: (string | Tag)[]){
      this.text = text;
      this.description = description;
      this.sydonyms = sydonyms;
      this.displayColour = displayColour;
      this.isInherited = isInherited;

      let tempStringList = [] as string[];


      //convert any children tags to their id
      children.forEach(element => {
        if(typeof(element) != 'string'){
          tempStringList.push(element.getTagId());
        }else{
          //confirm tag exists in libraray
          if(TagLibrary.tagExists(element)){
            tempStringList.push(element);
          }else{
            throw Error('Invalid Tag ID');
          }

        }
      });
      this.children = tempStringList;

      //convert any parent tags to their id
      tempStringList = [] as string[];
      
      parents.forEach(element => {
        if(typeof(element) != 'string'){
          tempStringList.push(element.getTagId());
        }else{
          //confirm tag exists in libraray
          if(TagLibrary.tagExists(element)){
            tempStringList.push(element);
          }else{
            throw Error('Invalid Tag ID');
          }

        }
      });
      this.parents = tempStringList;
      
      
      this.tagId = crypto.randomUUID();

      //register this tag in the library
      TagLibrary.Register(this);
  }

  public text: string;
  public description: string;
  public sydonyms: string[];
  public displayColour: Color;
  public isInherited: boolean;
  public children: string[];
  public parents: string[];
  private tagId: string;

  public getChildren(): string[] {
    return [];
  }

  public getTagId(): string{
    return this.tagId;
  }

}

export abstract class TagLibrary {
  public static Storage = {} as {[key:string]: Tag};

  public static Register(newTag: Tag): void {
    //throw error if the tag id conflicts
    Object.keys(this.Storage).forEach((existingKey)=>{
      if(existingKey == newTag.getTagId()){
        throw Error('Tag id already exists');
      }
    })
    
    this.Storage[newTag.getTagId()] = newTag;
  }

  public static tagExists(tagId: string): boolean{
    if(tagId in this.Storage){
      return false;
    }else{
      return true;
    }
  }
}