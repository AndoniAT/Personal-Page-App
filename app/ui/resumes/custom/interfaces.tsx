import { Block, ElementType, Media, ScreenType } from "@/app/lib/definitions"

export interface MediaClient {
    media_id?: string
    filename?: string
    url?: string,
    downloadurl?: string,
    contenttype?: string
    ishero?: boolean
    section_id?: string
    project_id?: string
    update?: Function|never
}

export interface UserClient {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    showheader: boolean,
    url_hero?: string,
    url_profile?: string
}

export interface SectionsClient {
    section_id:string,
    name: string,
    created: Date,
    public:boolean,
    ishome:boolean,
    css: string,
    blocks: BlocksScreenClient
    actions?: {
        addBlock: Function
    }
}

export interface BlocksScreenClient {
    phone: Block[],
    md: Block[],
    lg: Block[],
    xl: Block[],
    _2xl: Block[]
}

export interface BlockClient {
    block_id:string,
    numlines:number,
    numcols:number,
    defclassname:string,
    customclassname: string|null,
    css: string|null,

    place:number,
    screen: ScreenType,

    section_id:string,
    block_id_ref: string|null,

    elements:ElementBlockClient[]|[]
    actions?: {
        addElement: Function
    }
}

export interface ElementBlockClient {
    element_id: string,
    linefrom: number,
    lineto: number,
    colfrom: number,
    colto: number,
    defclassname: string,
    customclassname: string|null,
    css: string|null,
    content:string,
    type:ElementType,
    link:string|null,

    block_id:string,
    element_id_ref:string|null,
    actions?: {
        updateElement: Function
        deleteElement: Function
    }
}

export interface RGBA {
    r:number, g:number, b:number, a:number
}