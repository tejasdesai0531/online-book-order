import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BooksList, Book } from 'src/app/models/books-list.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  private books: Book[] = []

  constructor(
    private booksService: BooksService,
    private router: Router
    ) { }

  ngOnInit() {

    this.searchBooks("all", "motivation")

  }

  searchBooks(searchBy: String ,searchText: String) {

    this.booksService.searchBooks(searchBy, searchText).subscribe(
      (booksList: BooksList) => {
        this.books = booksList.books
      },

      (error) => {
        console.log(error)
      }
    )

  }

  navigateToBookDetails(book: Book) {
    this.router.navigate(['books', book.id]);
  }

}
