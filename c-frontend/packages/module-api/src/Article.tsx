export type Article = {
    id: number,
    name: string,
    content: string,
    categories:Category[]
}

export type Category = {
    id:number,
    name:string
}
