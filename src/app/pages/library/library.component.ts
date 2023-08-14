import { Component, OnInit } from '@angular/core';
import {BasePageComponent} from '../../partials/base-page/base-page.component';
import { ActivatedRoute } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Movie } from 'src/app/model/movie.model';
import { User } from 'src/app/model/user.model';
import { LibraryRepository } from 'src/app/model/library.repository';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent extends BasePageComponent implements OnInit{  
  
  repository ?: LibraryRepository;

  constructor(route:ActivatedRoute, dataSource:RestDataSource, repository: LibraryRepository){
    super(route);
    this.repository = repository;
    console.log(this.movies); 
  }; 

  override ngOnInit(): void 
  {       
       console.log(this.movies);
  }  
  
  get movies():Movie[]
  { 
    console.log(this.repository?.getMovies()!);   
    return this.repository?.getMovies()!;    
  }           
}
