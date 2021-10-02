export interface BooksList {
    totalItems: number;
    books:      Book[];
}

export interface Book {
    id:            string;
    title:         string;
    authors:       string[];
    publisher:     string;
    publishedDate: Date;
    description:   string;
    pageCount:     number;
    categories:    string[];
    imageLinks:    ImageLinks;
    listPrice:     Price;
    retailPrice:   Price;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail:      string;
}

export interface Price {
    amount:       number;
    currencyCode: CurrencyCode;
}

export enum CurrencyCode {
    Inr = "INR",
}