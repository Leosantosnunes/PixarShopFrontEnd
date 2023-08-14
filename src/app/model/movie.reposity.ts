import {Injectable} from '@angular/core';
import {Movie} from './movie.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class MovieRepository
{
    private movies : Movie[] = new Array<Movie>();
    public directors : (string | undefined)[] = [];
    public prices : (number | undefined)[] = [];
    //public ReleaseYear : (number | undefined)[] = [];

    constructor
    (
      private dataSource: RestDataSource  
    )
    {
        dataSource.getMovies().subscribe(data =>
            {            
            this.movies = data;            
            this.directors = data.map(b => b.director).filter((a,index,array) => array.indexOf(a) === index).sort();
            this.prices = data.map(b => b.price).filter((a,index,array) => array.indexOf(a) === index).sort();
            // this.ReleaseYear = data.map(b => (b.releaseDate ? new Date(b.releaseDate).getFullYear() : undefined)).filter((year, index, array) => typeof year === 'number' && array.indexOf(year) === index).sort();


        })
     }
    //director:string = null
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
      this.dataSource.addMovie(savedMovie).subscribe(b => {
        this.movies.push(savedMovie);
      });
    }
    else
    {
      this.dataSource.updateMovie(savedMovie).subscribe(movie => {
        this.movies.splice(this.movies.findIndex(b => b._id === savedMovie._id), 1, savedMovie);
      });
    }
  }

    deleteMovie(deletedMovieID: number): void
    {
      this.dataSource.deleteMovie(deletedMovieID).subscribe(movie => {
        this.movies.splice(this.movies.findIndex(b => b._id === deletedMovieID), 1);
      });
    }

};