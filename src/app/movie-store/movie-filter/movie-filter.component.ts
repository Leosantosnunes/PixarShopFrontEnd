import { Component, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Movie } from 'src/app/model/movie.model';
import { MovieFiltered } from 'src/app/model/movieFiltered.model';
import { RestDataSource } from 'src/app/model/rest.datasource';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent {
  public rootCategoryList: Map<MovieFiltered, boolean> = new Map<MovieFiltered, boolean>();
  public categoryList: Map<MovieFiltered, boolean> = new Map<MovieFiltered, boolean>();
  filteredMovies : MovieFiltered = {};
  movies?: Movie[] = new Array<Movie>();;
  directors ?: (string | undefined)[] = [];
  prices ?: (number | undefined)[] = [];
  releaseYear ?: (Date | undefined)[] = [];
  imdbs ?: (number | undefined)[] = [];

  @Output() selectedFilters = new EventEmitter<string>();

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
      this.releaseYear = this.movies?.map(b => b.releaseDate).filter((a, index, array) => array.indexOf(a) === index).sort();
      this.imdbs = this.movies?.map(b => b.imdbRating).filter((a, index, array) => array.indexOf(a) === index).sort();
      console.log("directors:" + this.directors);
      })


  }

  // ///////////

  filterDirector(director:any)
  {
    if(director)
    {
      this.filteredMovies.director = director;
    }
  }

  filterImdb(imdb:any)
  {
    if(imdb)
    {
      this.filteredMovies.imdbRating = imdb;
    }
  }

  filterPrice(price:any)
  {
    if(price)
    {
      this.filteredMovies.price = price;
    }
  }

  filterReleaseYear(year:any)
  {
    if(year)
    {
      this.filteredMovies.releaseDate = year;
    }
  }

  // filterRootCategory(entry?: { key: Category; value: boolean }) {
  //   this.rootCategoryList.set(entry.key, !entry.value);
  //   this.updateSelectedFilters();
  // }

  // filterCategory(entry: { key: Category; value: boolean }) {
  //   this.categoryList.set(entry.key, !entry.value);
  //   this.updateSelectedFilters();
  // }

  // filterColor(entry: { key: string; value: boolean }) {
  //   this.colorList.set(entry.key, !entry.value);
  //   this.updateSelectedFilters();
  // }

  // filterPrice(entry: { key: PriceFilter; value: boolean }) {
  //   this.priceList.set(entry.key, !entry.value);
  //   this.updateSelectedFilters();
  // }

  // ///////////

  // setCategoryFilterSelection(collection: Map<Category, boolean>, catInSelection: string[], catNotInSelection: string[]) {
  //   const inList: string[] = [];
  //   const ninList: string[] = [];
  //   collection.forEach((selected, category) => {
  //     if (selected) {
  //       inList.push(category._id);
  //     } else {
  //       ninList.push(category._id);
  //     }
  //   });

  //   /**
  //    * Only push elements if not all categories are either selected or unselected,
  //    * in that case we don't need filtering anything
  //    */
  //   if (inList.length !== 0 && ninList.length !== 0) {
  //     catInSelection.push(...inList);
  //     catNotInSelection.push(...ninList);
  //   }
  // }

  // setColorFilterSelection(collection: Map<string, boolean>): string[] {
  //   const inList = [];
  //   collection.forEach((value: boolean, key: string) => {
  //     if (value === true) {
  //       inList.push(key);
  //     }
  //   });
  //   return inList;
  // }

  // setPriceFilterSelection(collection: Map<PriceFilter, boolean>): number[][] {
  //   const inList: number[][] = [];

  //   collection.forEach((value: boolean, key: PriceFilter) => {
  //     if (value === true) {
  //       const range = [key.min, key.max];
  //       inList.push(range);
  //     }
  //   });

  //   return inList;
  // }

  // ///////////

  // updateSelectedFilters() {
  //   // categories
  //   const catInSelection: string[] = [];
  //   const catNotInSelection: string[] = [];

  //   this.setCategoryFilterSelection(this.categoryList, catInSelection, catNotInSelection);
  //   this.setCategoryFilterSelection(this.rootCategoryList, catInSelection, catNotInSelection);

  //   // colors

  //   const colorInSelection: string[] = this.setColorFilterSelection(this.colorList);

  //   // price
  //   const pricesInSelection: number[][] = this.setPriceFilterSelection(this.priceList);

  //   // query
  //   let jsonObj = {};
  //   if (catInSelection.length > 0 && catNotInSelection.length > 0) {
  //     jsonObj['metadata.categories'] = {
  //       $in: catInSelection,
  //       $nin: catNotInSelection
  //     };
  //   }
  //   if (colorInSelection.length > 0) {
  //     jsonObj['metadata.color'] = { $in: colorInSelection };
  //   }

  //   if (pricesInSelection.length > 0) {
  //     jsonObj['$or'] = [];
  //     pricesInSelection.forEach(price => {
  //       jsonObj['$or'].push({
  //         $and: [
  //           {
  //             'metadata.price': {
  //               $gte: price[0]
  //             }
  //           },
  //           {
  //             'metadata.price': {
  //               $lte: price[1]
  //             }
  //           }
  //         ]
  //       });
  //     });

  //     // Introducing "$or" means we need to combine with an "$and" for the other conditions
  //     const auxObj = { $and: [] };

  //     auxObj.$and.push(
  //       { "'metadata.categories": jsonObj['metadata.categories'], 'metadata.color': jsonObj['metadata.color'] },
  //       { $or: jsonObj['$or'] }
  //     );
  //     jsonObj = auxObj;
  //   }

  //   const query = encodeURIComponent(JSON.stringify(jsonObj));
  //   this.selectedFilters.emit(query);
  // }
}
