import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, TextField, IconButton
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../utils/queries';

const Authors = () => {
  const { loading, data } = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] });
  console.log({loading, data});
  const [editingAuthor, setEditingAuthor] = useState(null); // Name of the author being edited
  const [birthYear, setBirthYear] = useState(''); // Current value for inline edit

  const startEditing = (author) => {
    setEditingAuthor(author.name);
    setBirthYear(author.born || '');
  };

  const saveBirthYear = async () => {
    await editAuthor({ variables: { author: editingAuthor, setBornTo: Number(birthYear) } });
    setEditingAuthor(null); // Exit edit mode
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') saveBirthYear();
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>Authors</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>Name</TableCell>
              <TableCell sx={{ width: '25%' }}>Born</TableCell>
              <TableCell sx={{ width: '25%' }}>Books</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
            ) : (
              data?.allAuthors?.map((a) => (
                <TableRow key={a.name}>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>
                    {editingAuthor === a.name ? (
                      <TextField
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        onBlur={saveBirthYear}
                        onKeyDown={handleKeyPress}
                        autoFocus
                        size="small"
                        variant="standard"
                      />
                    ) : (
                      <span onClick={() => startEditing(a)} style={{ cursor: 'pointer' }}>
                        {a.born || '-'}
                        <IconButton size="small" sx={{ ml: 1, padding: '2px' }}>
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{a.bookCount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Authors;