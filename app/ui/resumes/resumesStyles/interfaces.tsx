import { Media } from "@/app/lib/definitions"

export interface UserClient {
    username: string,
    firstname: string,
    lastname: string,
    photo: string,
    email: string,
    photo_profile_id: string
}

export interface SectionsClient {
    name: string,
    created: Date,
    type: string,
    backgroundcolor: string,
    backgroundimage: string,
    medias: Media[]
}