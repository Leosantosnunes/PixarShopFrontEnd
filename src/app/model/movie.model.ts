export class Movie
{
    constructor(        
        public _id?: number,
        public title?: string,
        public overview ?: string,
        public director ?: string,
        public releaseDate ?: Date,
        public imdbRating ?: number,
        public posterUrl?: string,
        public price ?: number     
    ){} 

    public toString(): string
    {
        return `Movie 
        --------------------------------
        Name:         ${this.title}
        Overview:     ${this.overview}
        Director:     ${this.director}
        Release_date: ${this.releaseDate}
        imdbRating:   ${this.imdbRating}
        posterUrl:    ${this.posterUrl}
        Price:        ${this.price}
        ---------------------------------
        `
    }
}