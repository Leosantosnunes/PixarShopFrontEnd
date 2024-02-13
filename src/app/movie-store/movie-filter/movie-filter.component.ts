import { Component, EventEmitter, Output } from '@angular/core';
import { forkJoin, tap, map, filter } from 'rxjs';
import { Movie } from 'src/app/model/movie.model';
import { MovieFiltered } from 'src/app/model/movieFiltered.model';
import { RestDataSource } from 'src/app/model/rest.datasource';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent {
  filteredMovies : MovieFiltered = new MovieFiltered();
  movies?: Movie[] = new Array<Movie>();;
  directors ?: (string | undefined)[] = [];
  prices ?: (number | undefined)[] = [];
  releaseYear ?: (number | undefined)[] = [];
  imdbs ?: (number | undefined)[] = [];

  @Output() filteredMoviesChanged: EventEmitter<MovieFiltered> = new EventEmitter<MovieFiltered>();

  constructor(private dataSource: RestDataSource) {this.movies = []}

  ngOnInit() {

    /** */
    /*hay que usar props para reducir las peticiones
     */
    this.dataSource.get('movieStore').subscribe(data =>
      {
      this.movies = data;

      this.directors = this.movies?.map(b => b.director).filter((a,index,array) => array.indexOf(a) === index).sort();
      this.prices = this.movies?.map(b => b.price).filter((a,index,array) => array.indexOf(a) === index).sort();

      this.releaseYear = this.movies
      ?.filter(b => b.releaseDate) // Filter out movies with undefined releaseDate
      .map(b => new Date(b.releaseDate!).getFullYear()) // Extracting only the year part
      .filter((a, index, array) => array.indexOf(a) === index) // Filtering unique years
      .sort();

      this.imdbs = this.movies
      ?.filter(b => typeof b.imdbRating === 'number') // Filter out movies with undefined or non-numeric imdbRating
      .map(b => Math.round(b.imdbRating!)) // Round to one decimal place
      .filter((a, index, array) => array.indexOf(a) === index) // Filtering unique ratings
      .sort();
      })
  }

  // ///////////

  filterDirector(director: any) {
    if (director) {
      const index = this.filteredMovies.director?.indexOf(director);
      if (index !== undefined && index !== -1) {
        this.filteredMovies.director?.splice(index, 1);
      } else {
        this.filteredMovies.director?.push(director);
      }
    }
    this.emitFilteredMovies();
  }

  filterImdb(imdb: any) {
    if (imdb) {
      const index = this.filteredMovies.imdbRating?.indexOf(imdb);
      if (index !== undefined && index !== -1) {
        this.filteredMovies.imdbRating?.splice(index, 1);
      } else {
        this.filteredMovies.imdbRating?.push(imdb);
      }
    }
    this.emitFilteredMovies();
  }

  filterPrice(price: any) {
    if (price) {
      const index = this.filteredMovies.price?.indexOf(price);
      if (index !== undefined && index !== -1) {
        this.filteredMovies.price?.splice(index, 1);
      } else {
        this.filteredMovies.price?.push(price);
      }
    }
    this.emitFilteredMovies();
  }

  filterReleaseYear(year: any) {
    if (year) {
      const index = this.filteredMovies.releaseDate?.indexOf(year);
      if (index !== undefined && index !== -1) {
        this.filteredMovies.releaseDate?.splice(index, 1);
      } else {
        this.filteredMovies.releaseDate?.push(year);
      }
    }
    this.emitFilteredMovies();
  }

  clearFilters()
  {
    this.filteredMovies.director = [];
    this.filteredMovies.releaseDate = [];
    this.filteredMovies.imdbRating = [];
    this.filteredMovies.price = [];
    this.emitFilteredMovies();
  }

  emitFilteredMovies() {
    this.filteredMoviesChanged.emit(this.filteredMovies);
  }
}
