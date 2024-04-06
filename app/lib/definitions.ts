export type User = {
    user_id: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    photo: string;
    email: string;
    photo_profile_id: string;
};

export type SectionType = 'Projects' | 'Gallery' | 'Custom' | 'Home';

export type Section = {
    section_id: string;
    name: string;
    created: Date;
    public: boolean;
    type: SectionType;
    style: number;
    backgroundcolor: string;
    backgroundimage: string;
};

export type Media = {
    media_id: string
    filename: string
    key: string,
    url: string,
    contenttype: string,
    size:number,

    position: number
    ishero: boolean

    section_id: string
    project_id?: string
    update: Function|never
}

export type MediaEditMode = {
    media_id: string
    filename: string
    url: string,
    downloadurl: string,
    contenttype: string
    position: number
    ishero: boolean
    section_id: number
    project_id: number
    update: Function|never
}

export interface Block {
    block_id:number,
    numlines:number,
    numcols:number,
    defclassName:string,
    customclassname: string|null,
    css: string|null,
    section_id: string,
    place:number,
    elements?:Element[]
}

export interface ElementBlock {
    element_id: string,
    linefrom: number,
    lineto: number,
    colfrom: number,
    colto: number,
    defclassname: string,
    customclassname: string|null,
    css: string|null,
    content:string
    type:'text'|'media'|'linkvideo'|'html',
    block_id:string
}

export interface Positions {
    line:number,
    col:number,
    indexArr:number
  }
  
export interface FusionBlocks {
    from:Positions|null, 
    to:Positions|null
  }