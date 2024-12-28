import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query GetAllAuthors {
  allAuthors {
    id
    bookCount
    born
    name
}
}`

export const ALL_BOOKS = gql`
query GetAllBooks {
  allBooks {
    title
    author {
      bookCount
      born
      id
      name
    }
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
    author {
      bookCount
      born
      id
      name
    }
  }
}
`

export const EDIT_AUTHOR = gql`
mutation setBornYear(
  $author: String!,
  $setBornTo: Int!
) {
  editAuthor(
    name: $author,
    setBornTo: $setBornTo
  ) {
    name
    id
    born
    bookCount
  }
}
`

export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const LIST_USERS = gql`
query listUsers {
  allUsers {
    id
    username
    favoriteGenre
  }
}
`