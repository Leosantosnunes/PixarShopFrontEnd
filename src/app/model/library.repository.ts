import {Injectable} from '@angular/core';
import {Movie} from './movie.model';
import { RestDataSource } from './rest.datasource';
import { User } from './user.model';

@Injectable()
export class LibraryRepository
{
    private movies ?: Movie[];
    private user ?: User;
    private userID : number = 0;

    constructor
    (
      private dataSource: RestDataSource
    )
    {
        const userString =  localStorage.getItem('user');
        if (typeof userString === 'string') {
          const userObject = JSON.parse(userString);
          this.userID = userObject._id;
        } else {
          console.error('Invalid user data in localStorage.');
        }
        dataSource.get("library",this.userID).subscribe(data =>
            {
            this.user = data;
            //console.log(this.user);
            this.movies = this.user!.movies;
            //console.log(this.user.movies);
            return this.movies;
        })
     }

     getMovies(): Movie[]
    {
        console.log(this.movies);
        return this.movies!;
    }
};
