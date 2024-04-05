import { Media } from "@/app/lib/definitions"

export interface MediaClient {
    media_id?: string
    filename?: string
    url?: string,
    downloadurl?: string,
    contenttype?: string
    position?: number
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
    photo_profile: MediaClient|null
}

export interface SectionsClient {
    name: string,
    created: Date,
    type: string,
    backgroundcolor: string,
    backgroundimage: string,
    medias: MediaClient[]
}

export interface Block {
    id:number,
    numLines:number,
    numCols:number,
    defClassName:string,
    customClassName: string,
    elements:ElementBlock[]
}

export interface ElementBlock {
    id: number,
    lineFrom: number,
    lineTo: number,
    colFrom: number,
    colTo: number,
    defClassName: string,
    customClassName: string
}