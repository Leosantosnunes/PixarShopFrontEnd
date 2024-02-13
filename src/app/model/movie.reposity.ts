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

    getMoviesOrFilteredMovies(): Observable<Movie[]>
    {
      return this.dataSource.get('movieStore');
    }

    getMovie(id:number): Movie
    {
        //no "!"
        return this.movies.find(b => b._id == id)!;
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
