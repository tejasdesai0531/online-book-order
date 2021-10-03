import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiMethod } from '../core/services/consts';
import { HttpService } from '../core/services/http/http.service';
import { Book, BooksList } from '../models/books-list.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private __http: HttpService) { }

  searchBooks(searchBy: String, searchText: String): Observable<BooksList> {

    let params = {
      searchBy,
      searchText
    }

    return this.__http.requestCall('/books/search', ApiMethod.GET, null, params)
      .pipe(map(data => {
        return data
      }))
  }

  bookDetails(id): Observable<Book> {
    return this.__http.requestCall(`/books/${id}`, ApiMethod.GET)
  }
}
