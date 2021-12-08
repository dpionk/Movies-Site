import { normalize, schema } from 'normalizr';

const book = new schema.Entity('books', {})
const authors = new schema.Entity('authors', {})

book.define({
	authors: [authors]
})

const bookListSchema = [book]
const apiData = [
    {
        id: 'xyz',
        title: 'Książka 1',
        pages: 456,
        authors: [
            {
                id: 'az1',
                firstName: 'Albert',
                lastName: 'Kowalski'
            },
            {
                id: 'az2',
                firstName: 'Adam',
                lastName: 'Nowak'
            }
        ]
    },
    {
        id: 'xyy',
        title: 'Książka 2',
        pages: 355,
        authors: [
            {
                id: 'az1',
                firstName: 'Albert',
                lastName: 'Kowalski'
            }
        ]
    },
    {
        id: 'xzy',
        title: 'Książka 3',
        pages: 643,
        authors: [
            {
                id: 'az3',
                firstName: 'Albert',
                lastName: 'Kowalski'
            },
            {
                id: 'az4',
                firstName: 'Monika',
                lastName: 'Kowal'
            },
            {
                id: 'az5',
                firstName: 'Grzegorz',
                lastName: 'Szpak'
            }
        ]
    },
    
]

const normalizedData = normalize(apiData, bookListSchema)

console.log(normalizedData.entities.books)