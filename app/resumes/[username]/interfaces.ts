import { SectionType } from "@/app/lib/definitions"

export interface SectionsNavBar {
    section_id: string,
    name: string,
    created: Date,
    type: SectionType,
    background: {
        update?: Function,
        color: string
    }
}