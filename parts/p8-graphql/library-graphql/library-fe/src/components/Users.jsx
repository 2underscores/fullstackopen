import { LIST_USERS } from "../utils/queries"
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

const Users = () => {

  const usersResult = useQuery(LIST_USERS)

  return (
    <div>
    <Typography variant="h4" sx={{ mb: 3 }}>Users</Typography>
    {usersResult.loading ? (
      <Typography>Loading...</Typography>
    ) : (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Fav Genre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersResult.data.allUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.favouriteGenre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </div>
  )
}

export default Users
