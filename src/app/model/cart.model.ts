import { Injectable} from '@angular/core';
import { Movie } from './movie.model';

@Injectable()
export class Cart
{
    public lines: CartLine[] = [];
    public itemCount = 0;
    public cartPrice = 0; 
    
    addLine(movie: Movie, quantity: number =1):void
    {
        const line = this.lines.find(l => l.movie._id === movie._id);
        if(line !== undefined){
            line.quantity += quantity;
        }
        else{
            this.lines.push(new CartLine(movie,quantity));
        }
        this.recalculate();
    }
    updateQuantity(movie: Movie, quantity : number): void{
        const line = this.lines.find(l => l.movie._id == movie._id);
        if(line !== undefined){
            line.quantity = Number(quantity);  
        }
        this.recalculate();        
    }

    removeLine(id ?: number): void {
        const index = this.lines.findIndex(l => l.movie._id === id);
        this.lines.splice(index,1);
        this.recalculate();
    }

    clear():void {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    private recalculate(): void {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += (l.quantity * l.movie.price!);
        })
    }

    handleUpdateQuantity(event: Event, movie: Movie): void {
        const quantity = (event.target as HTMLSelectElement).value;
        if(quantity){this.updateQuantity(movie, Number(quantity));}
        
      }
    
}
export class CartLine
{
    constructor(public movie:Movie,
        public quantity: number)  { }

    get lineTotal(): number 
    {
        return this.quantity * this.movie.price!;
    }
}