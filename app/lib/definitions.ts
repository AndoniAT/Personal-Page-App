export type User = {
    user_id: string;
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