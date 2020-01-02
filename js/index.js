class Film {
  constructor(title, director) {
    this.title = title;
    this.director = director;
  }
}

let killBill = new Film('Kill Bill Vol 1', 'Quentin Tarentino')
let goodfellas = new Film('Goodfellas', 'Martin Scorsese')

let films = [killBill, goodfellas]
