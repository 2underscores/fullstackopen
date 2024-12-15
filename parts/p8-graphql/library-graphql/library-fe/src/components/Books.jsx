import { ALL_BOOKS } from "../utils/queries"
import { useQuery } from "@apollo/client"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography 
 } from '@mui/material';

const Books = () => {

  const booksResult = useQuery(ALL_BOOKS)

  return (
    <div>
    <Typography variant="h4" sx={{ mb: 3 }}>Books</Typography>
    {booksResult.loading ? (
      <Typography>Loading...</Typography>
    ) : (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booksResult.data.allBooks.map((a) => (
              <TableRow key={a.title}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.author}</TableCell>
                <TableCell>{a.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </div>
  )
}

export default Books
