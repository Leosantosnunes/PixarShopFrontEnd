import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieRepository } from '../model/movie.reposity';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';
import { RestDataSource } from '../model/rest.datasource';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-movie-store',
  templateUrl: './movie-store.component.html',
  styleUrls: ['./movie-store.component.css']
})
export class MovieStoreComponent  {

  public selectedFilter : any = '';
  public selectedYear : number = 0;
  public moviesPerPage : number = 9;
  public selectedPage : number  = 1;
  hidden : boolean = true;
  synopsis = document.querySelector("synopsis");

  constructor(private repository:MovieRepository, private cart:Cart, private router: Router){}


  get movies():Movie[]
  {
    const pageIndex = (this.selectedPage -1) * this.moviesPerPage;
    return this.repository.getMovies(this.selectedFilter).slice(pageIndex, pageIndex + this.moviesPerPage)!;
  }

  get directors(): (string|undefined)[]{
    return this.repository.getDirectors();
  }

  get prices(): (number|undefined)[]{
    return this.repository.getPrice();
  }

  get pageCount(): number{
    return Math.ceil(this.repository.getMovies(this.selectedFilter).length / this.moviesPerPage)
  }

  changeFilter(newFilter?: any):void{
    this.selectedFilter = newFilter!;
  }

    //Filter by director

  handleChangeDirector(event: Event): void {
    const newFilter = (event.target as HTMLSelectElement).value;
    if (newFilter == '') {
      this.changeFilter();
    }
    else{
      this.changeFilter(newFilter)
      console.log(typeof newFilter);
    }
  }

    //Filter by Price

  handleChangePrice(event: Event): void {
    const newFilter = (event.target as HTMLSelectElement).value;
    if (newFilter == '') {
      this.changeFilter();
    }
    else{
      this.changeFilter(Number(newFilter))
      console.log(typeof newFilter);
    }
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

  mouseOver(){
    this.hidden=false;
  }


}
