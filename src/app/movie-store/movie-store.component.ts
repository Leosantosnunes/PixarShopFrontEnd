import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieRepository } from '../model/movie.reposity';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';
import { RestDataSource } from '../model/rest.datasource';
import { createPopper } from '@popperjs/core';
import { MovieFiltered } from '../model/movieFiltered.model';
import { tap } from 'cypress/types/lodash';

@Component({
  selector: 'app-movie-store',
  templateUrl: './movie-store.component.html',
  styleUrls: ['./movie-store.component.css']
})
export class MovieStoreComponent implements OnInit  {

  public selectedFilter : any = '';
  public selectedYear : number = 0;
  public moviesPerPage : number = 9;
  public selectedPage : number  = 1;
  movies : Movie[] = [];
  hidden : boolean = true;
  synopsis = document.querySelector("synopsis");
  filteredMovies?: MovieFiltered = undefined;

  // get movies():Movie[]
  // {
  //   const pageIndex = (this.selectedPage -1) * this.moviesPerPage;
  //   return this.repository.getMoviesOrFilteredMovies()
  //   .filter(movie => {
  //     // Check if the movie matches the filteredMovies attributes
  //     return (
  //       (!this.filteredMovies.director || this.filteredMovies.director.includes(movie.director || '')) &&
  //       (!this.filteredMovies.releaseDate || this.filteredMovies.releaseDate.includes(new Date(movie.releaseDate!).getFullYear())) &&
  //       (!this.filteredMovies.imdbRating || this.filteredMovies.imdbRating.includes(Math.round(movie.imdbRating!))) &&
  //       (!this.filteredMovies.price || this.filteredMovies.price.includes(movie.price || 0))
  //     );
  //   })
  //   .slice(pageIndex, pageIndex + this.moviesPerPage); // Apply pagination
  // }


  constructor(private repository:MovieRepository, private cart:Cart, private router: Router){}

  ngOnInit(): void {
    this.displayMovies();
  }

  get pageCount(): number{
    return Math.ceil(this.movies.length / this.moviesPerPage)
  }

  displayMovies(){
    const pageIndex = (this.selectedPage -1) * this.moviesPerPage;
    this.repository.getMoviesOrFilteredMovies().subscribe(b => {
      console.log(b);
      if(typeof this.filteredMovies === undefined ){
        this.movies = b;
      }
      else{
        // this.movies = b.filter(movie => {
        //   // Check if the movie matches the filteredMovies attributes
        //     (!this.filteredMovies.director || this.filteredMovies.director.includes(movie.director || '')) &&
        //     (!this.filteredMovies.releaseDate || this.filteredMovies.releaseDate.includes(new Date(movie.releaseDate!).getFullYear())) &&
        //     (!this.filteredMovies.imdbRating || this.filteredMovies.imdbRating.includes(Math.round(movie.imdbRating!))) &&
        //     (!this.filteredMovies.price || this.filteredMovies.price.includes(movie.price));
        // })
        // .slice(pageIndex, pageIndex + this.moviesPerPage); // Apply pagination
      }
    console.log(this.movies,this.filteredMovies);
    })
  }

  changeFilter(newFilter?: any):void{
    this.selectedFilter = newFilter!;
  }

  changePage(newPage: number): void{
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void{
    this.moviesPerPage = Number(newSize);
    this.changePage(1);
  }

  addMovieToCart(movie: Movie):void{
    this.cart.addLine(movie);
    this.router.navigateByUrl('/cart')
  }

  handleChangePageSize(event: Event): void {
    const newSize = (event.target as HTMLSelectElement).value;
    if (newSize) {
      this.changePageSize(Number(newSize));
    }
  }

  handleMouseOver(event: Event): void {
    const MouseOver = (event.target as HTMLElement).querySelectorAll('MovieList');

    if (MouseOver) {
      this.mouseOut();
    }
  }

  mouseOut(){
    this.hidden= true;

  }

  onFilteredMoviesChanged(filteredMovies: MovieFiltered) {
    this.filteredMovies = filteredMovies;
  }


}
