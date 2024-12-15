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

