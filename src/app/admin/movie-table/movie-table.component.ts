import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieRepository } from 'src/app/model/movie.reposity';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css']
})
export class MovieTableComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private repository: MovieRepository,private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies()
  {
    this.repository.getMoviesOrFilteredMovies().subscribe(data => this.movies = data);
  }

  deleteMovie(id: number): void
  {
    if (confirm('Are you sure?') && (id !== undefined))
    {
      this.repository.deleteMovie(id);
    }
    else
    {
      window.location.reload(); // refresh fix
      this.router.navigateByUrl('/admin/movies');
    }
    }

  addMovie(): void
  {
  this.router.navigateByUrl('/admin/movies/add');
  }

  editMovie(id : number): void
  {
  this.router.navigateByUrl('/admin/movies/edit/' + id);
  }
}


