export class MovieFiltered
{
    public _id?: number;
    public title?: string;
    public overview ?: string;
    public director ?: string;
    public releaseDate ?: Date;
    public imdbRating ?: number;
    public posterUrl?: string;
    public price ?: number;

    constructor(obj:any){
      this._id = obj._id;
      this.title= obj.title;
      this.director = obj.director;
      this.releaseDate = obj.releaseDate;
      this.imdbRating = obj.imdbRating;
      this.price = obj.price;
    }

}
