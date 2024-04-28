export type User = {
    user_id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    showheader:boolean;
    url_hero: string;
    url_profile: string;
};

export type Resume = {
    resume_id: string,
    created:string
    user_id:string
}

export type Section = {
    section_id: string;
    name: string;
    created: Date;
    public: boolean;
    ishome: boolean;
    css: string;
    
    resume_id: string;
};

export type Media = {
    media_id: string
    filename: string
    key: string,
    url: string,
    contenttype: string,
    size:number,

    user_id:string
    /*update: Function|never*/
}

export type ScreenType = 'def'|'md'|'lg'|'xl'|'2xl';
export interface Block {
    block_id: string,
    numlines: number,
    numcols: number,
    defclassName: string,
    customclassname: string,
    css: string,
    
    place: number,
    screen: ScreenType,
    
    section_id: string,

    elements?: Element[]
}

export type ElementType = 'text'|'media'|'linkvideo'|'html';
export interface ElementBlock {
    element_id: string,
    linefrom: number,
    lineto: number,
    colfrom: number,
    colto: number,
    defclassname: string,
    customclassname: string,
    css: string,
    content:string
    type: ElementType,

    block_id:string
    element_id_ref:string|null
}

export interface Positions {
    line:number,
    col:number,
    indexArr:number
  }
  
export interface FusionElementsBlock {
    from:Positions|null, 
    to:Positions|null
  }