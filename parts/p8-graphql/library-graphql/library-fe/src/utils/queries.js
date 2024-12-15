import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    bookCount
    born
    name
}
}`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    genres
    id
    published
  }
}`

export const ADD_BOOK = gql`
mutation AddBook(
  $title: String!, 
  $author: String!, 
  $published: Int!, 
  $genres: [String!]!
) {
  addBook(
    title: $title, 
    published: $published, 
    author: $author, 
    genres: $genres
) {
    genres
    id
    published
    title
    author
}
}
`