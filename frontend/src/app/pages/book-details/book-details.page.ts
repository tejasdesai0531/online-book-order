import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from 'src/app/models/books-list.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  private book: Book;
  private isLoaded = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private zone: NgZone,
  ) {
    // let bookId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.getBookDetails(bookId)

    // this.activatedRoute.params.subscribe(paramsId => {
    //   this.getBookDetails(paramsId.id)
    // });
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.getBookDetails(params.get('id'))
    })
  }

  ngOnInit() {
    console.log("HII ngoninit")
  }

  getBookDetails(bookId: String) {

    this.booksService.bookDetails(bookId).subscribe(
      (book: Book) => {
        this.book = book
        this.isLoaded = true
        console.log("book", this.book)
        this.ngOnInit();
      },

      (error) => {
        console.log(error)
      }
    )

  }

}
