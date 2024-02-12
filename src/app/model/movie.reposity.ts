import {Injectable} from '@angular/core';
import {Movie} from './movie.model';
import { RestDataSource } from './rest.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class MovieRepository
{
    private movies : Movie[] = new Array<Movie>();
    public directors : (string | undefined)[] = [];
    public prices : (number | undefined)[] = [];
    //public ReleaseYear : (number | undefined)[] = [];

    constructor(private dataSource: RestDataSource){}

    getMovies(price: number): Movie[];
    getMovies(director :string): Movie[];
    getMovies(): Movie[];
    getMovies(param: string | number = '' ): Movie[]
    {
        if(typeof param == 'string'){
        return this.movies.filter(b => param == '' || param == b.director);
        }
        else if(typeof param == 'number'){
            return this.movies.filter(b =>  param == b.price);
        }
        else{
            return this.movies;
        }
    }

    // GetMoviesByYear(year?:Number):Movie[]{
    //     return this.movies.filter(b => year == b.releaseDate?.getFullYear);
    //     console.log(year);
    // }

    getMoviesOrFilteredMovies(): Observable<Movie[]>
    {
      return this.dataSource.get('movieStore');
    }

    getMovie(id:number): Movie
    {
        //no "!"
        return this.movies.find(b => b._id == id)!;
    }
    getDirectors(): (string | undefined)[]
    {
        return this.directors;
    }
    getPrice(): (number| undefined)[]
    {
        return this.prices;
    }



    saveMovie(savedMovie: Movie): void
  {
    if (savedMovie._id === null || savedMovie._id === 0 || savedMovie._id === undefined)
    {
      this.dataSource.post("movieStore/add",savedMovie).subscribe(b => {
        this.movies.push(savedMovie);
      });
    }
    else
    {
      this.dataSource.post("movieStore/edit",savedMovie,true).subscribe(movie => {
        this.movies.splice(this.movies.findIndex(b => b._id === savedMovie._id), 1, savedMovie);
      });
    }
  }

    deleteMovie(deletedMovieID: number): void
    {
      this.dataSource.get("movieStore/delete",deletedMovieID).subscribe(movie => {
        this.movies.splice(this.movies.findIndex(b => b._id === deletedMovieID), 1);
      });
    }

};
