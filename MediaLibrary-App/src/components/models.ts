import { NamedColor } from 'quasar';

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
  constructor(text: string, description: string, sydonyms: string[], displayColour: NamedColor, isInherited: boolean, childReccomendations: (string | Tag)[], parentReccomendations: (string | Tag)[]){
    this.text = text;
    this.description = description;
    this.sydonyms = sydonyms;
    this.displayColour = displayColour;
    this.isInherited = isInherited;

    let tempStringList = [] as string[];


    //convert any childReccomendations tags to their id
    childReccomendations.forEach(element => {
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
    this.childReccomendations = tempStringList;

    //convert any parent tags to their id
    tempStringList = [] as string[];
    
    parentReccomendations.forEach(element => {
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
    this.parentReccomendations = tempStringList;
    
    
    this.tagId = crypto.randomUUID();

    //register this tag in the library
    TagLibrary.Register(this);
  }

  public text: string;
  public description: string;
  public sydonyms: string[];
  public displayColour: NamedColor;
  public isInherited: boolean;
  public childReccomendations: string[];
  public parentReccomendations: string[];
  public tagId: string;

  public getchildReccomendations(): string[] {
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
      return true;
    }else{
      return false;
    }
  }

  public static getTagList() {
    return this.generateTagChainFromList(Object.keys(this.Storage));
  }

  public static generateTagChainFromList(listOfTags: AnyTag[]): TagChain[]{
    //generate a list of all
    const output = [] as TagChain[]
    
    listOfTags.forEach(tagReference => {
      output.push(new TagChain(
        this.getTagFromReference(tagReference),
        this.generateTagChainFromList([])
      ))
    });

    return output;

  }

  public static getTagFromReference(inputTag: AnyTag): Tag {
    if(inputTag instanceof Tag){
      return inputTag;
    }

    if(inputTag instanceof TagChain){
      return this.Storage[inputTag.primaryTagId]
    }

    return this.Storage[inputTag];
  }

  public static getTagByText(inputTag: string): Tag|undefined {
    let output = undefined as undefined|Tag;
    
    Object.values(this.Storage).forEach((existingTag)=>{
      if(existingTag.text.toLowerCase() == inputTag.toLowerCase()){
        output = existingTag;
        return;
      }
    })

    return output;
  }

  public static getIdFromTag(inputTag: Tag|TagChain): string{
    if(inputTag instanceof Tag){
      return inputTag.tagId;
    }

    if(inputTag instanceof TagChain){
      return inputTag.primaryTagId
    }

    throw Error('Tag was neither a Tag or TagChain');
  }

  public static sortTagFunction(tagA: AnyTag, tagB: AnyTag): number{
    //Get actual tag info
    const a = this.getTagFromReference(tagA);
    const b = this.getTagFromReference(tagB);

    if(a.text < b.text){
      return 1;
    }

    if(a.text > b.text){
      return -1
    }

    return 0;
  }
}

export type AnyTag = string | Tag | TagChain;
export class TagChain {
  constructor(primaryTag: string|Tag, children: (TagChain)[]){
    const tempStringList = [] as TagChain[]; 

    children.forEach(element => {
      //confirm tag exists in libraray
      if(TagLibrary.tagExists(element.primaryTagId)){
        tempStringList.push(element);
      }else{
        throw Error('Invalid Tag ID');
      }
    });

    this.children = tempStringList;
    
    if(typeof(primaryTag) != 'string'){
      this.primaryTagId = primaryTag.getTagId();
    }else{
      //confirm tag exists in libraray
      if(TagLibrary.tagExists(primaryTag)){
        this.primaryTagId = primaryTag;
      }else{
        throw Error('Invalid Tag ID');
      }
    }
  }

  public children = [] as TagChain[];
  public primaryTagId = '';

}
