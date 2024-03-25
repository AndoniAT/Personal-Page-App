export interface UserClient {
    firstname: string,
    lastname: string,
    photo: string,
    email: string
}

export interface SectionsClient {
    name: string,
    created: Date,
    type: string
    backgroundcolor: string
    backgroundimage: string
}