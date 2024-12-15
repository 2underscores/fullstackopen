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
import { ALL_AUTHORS } from '../utils/queries';

const Authors = () => {

  const authorsResult = useQuery(ALL_AUTHORS)

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>Authors</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Born</TableCell>
              <TableCell>Books</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authorsResult.loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : (
              authorsResult.data.allAuthors.map((a) => (
                <TableRow key={a.name}>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.born}</TableCell>
                  <TableCell>{a.bookCount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Authors
