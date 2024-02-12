export class MovieFiltered {
  public _id?: number;
  public title?: string;
  public director?: string[] = [];
  public releaseDate?: number[] = [];
  public imdbRating?: number[] = [];
  public price?: number[] = [];

  constructor() {}
}
