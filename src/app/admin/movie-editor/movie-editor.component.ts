import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieRepository } from 'src/app/model/movie.reposity';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.css']
})
export class MovieEditorComponent {
  editing = false;
  movie: Movie = new Movie();

  constructor(private repository: MovieRepository,
              private router: Router,
              activeRoute: ActivatedRoute)
  {
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing)
    {
     Object.assign(this.movie, repository.getMovie(activeRoute.snapshot.params['id']));
    }
  }  

  save(form: NgForm): void
  {
    this.repository.saveMovie(this.movie);
    this.router.navigateByUrl('/admin/movies');
  }
}
