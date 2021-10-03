import express, { Response, Request} from 'express'
import { checkSchema, query } from 'express-validator';
import axios from 'axios';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router()

interface Book {
    id: string,
    title: string,
    authors: [string],
    publisher: string,
    publishedDate: string,
    description: string,
    pageCount: number,
    categories: [string],
    imageLinks: {
        smallThumbnail: string,
        thumbnail: string
    },
    listPrice: {
        amount: number,
        currencyCode: string
    },
    retailPrice: {
        amount: number,
        currencyCode: string
    }
}

router.get(
    '/search',
    [
        query('searchBy')
            .isIn(['all', 'category', 'title', 'author', 'publisher'])
            .withMessage('invalid searchBy text'),
        query('searchText')
            .isLength({min: 1})
            .withMessage('searchText is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { searchBy, searchText } = req.query

        let q = ""
        if (searchBy === 'all') {
            q = searchText as string
        } else if (searchBy === 'category') {
            q = `subject:${searchText}`
        } else if (searchBy === 'title') {
            q = `intitle:${searchText}`
        } else if (searchBy === 'author') {
            q = `inauthor:${searchText}`
        } else if (searchBy === 'publisher') {
            q = `inpublisher:${searchText}`
        }

        let params = {
            q: q,
            filter: 'paid-ebooks',
            key: process.env.GOOGLE_BOOKS_API_KEY
        }

        let response = (await axios.get('https://www.googleapis.com/books/v1/volumes', { params: params })).data

        let books: Book[] = []

        if(response.totalItems > 0) {
            response.items.forEach((item: any) => {

                books.push({
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors,
                    publisher: item.volumeInfo.publisher,
                    publishedDate: item.volumeInfo.publishedDate,
                    description: item.volumeInfo.description,
                    pageCount: item.volumeInfo.pageCount,
                    categories: item.volumeInfo.categories,
                    imageLinks: item.volumeInfo.imageLinks,
                    listPrice: item.saleInfo.listPrice,
                    retailPrice: item.saleInfo.retailPrice
                })
    
            })
        }

        res.send({ 
            totalItems: response.totalItems,
            books: books
        })

})


export { router as searchBooksRouter }