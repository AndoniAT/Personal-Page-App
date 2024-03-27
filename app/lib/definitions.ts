export type User = {
    user_id: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    photo: string;
    email: string;
};

export type SectionType = 'Projects' | 'Gallery' | 'Custom' | 'Home';

export type Section = {
    section_id: string;
    name: string;
    created: Date;
    visible: boolean;
    type: SectionType;
    style: number;
    backgroundcolor: string;
    backgroundimage: string;
};

export type Media = {
    media_id: string
    filename: string
    url: string,
    downloadurl: string,
    contenttype: string
    position: number
    ishero: boolean
    section_id: number
    project_id: number
}