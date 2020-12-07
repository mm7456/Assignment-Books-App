export class Book {
  public name: string;
  public description: string;
  public author: string;
  public price: number;
  public uid:number;

  constructor(name: string, desc: string, author: string, price: number,uid:number) {
    this.name = name;
    this.description = desc;
    this.author = author;
    this.price = price;
   this.uid=uid;
  }
}
