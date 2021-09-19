import express, { Response, Request} from 'express'
import { query } from 'express-validator';
import axios from 'axios';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router()

interface SearchResponse {
    kind: string,
    totalItems: Number,
    books: [Book]
}

interface Book {
    volumeInfo: {
        id: string,
        title: string,
        subtitle: string,
        authors: [string],
        publisher: string,
        publishedDate: string,
        pageCount: Number,
        categories: [string],
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string
        }
    },
    saleInfo: {
        listPrice: {
            amount: number,
            currencyCode: string
        },
        retailPrice: {
            amount: number,
            currencyCode: string
        }
    }
}

router.get(
    '/search',
    [
        query('searchBy')
            .exists()
            .withMessage('searchBy is required'),
        query('searchText')
            .exists()
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

        let response = (await axios.get<SearchResponse>('https://www.googleapis.com/books/v1/volumes', { params: params })).data

        res.send(response)

})


export { router as searchBooksRouter }