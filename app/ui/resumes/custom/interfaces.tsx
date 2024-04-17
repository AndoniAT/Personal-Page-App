import { Media } from "@/app/lib/definitions"

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
    photo: string,
    email: string,
    showheader: boolean,
    photo_profile?: MediaClient
}

export interface SectionsClient {
    section_id:string,
    name: string,
    created: Date,
    type: string,
    backgroundcolor: string,
    medias: MediaClient[]
    blocks: BlockClient[]|[]
    actions?: {
        addBlock: Function
    }
}

export interface BlockClient {
    block_id:string,
    numlines:number,
    numcols:number,
    defclassname:string,
    customclassname: string|null,
    css: string|null,
    section_id:string,
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
    type:'text'|'media'|'linkvideo'|'html',
    block_id:string,
    media_id?:string,
    actions?: {
        updateElement: Function
        deleteElement: Function
    }
}