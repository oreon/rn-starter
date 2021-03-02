export type Article = {
    id: number;
    title: string;
    body:string;
    image:string
};

export type Recipe = {
    id: number;
    title: string;
    body:string;
    
    image:string
    favourited:boolean
};