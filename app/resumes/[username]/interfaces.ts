export interface SectionsNavBar {
    id: string,
    name: string,
    created: Date,
    type: string,
    background: {
        update?: Function,
        color: string
    }
}