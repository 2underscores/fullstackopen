import { Link } from "react-router"
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Card, CardContent, Typography } from '@mui/material'

const AnecdoteList = ({ anecdotes }) => (
    <Card className="w-full max-w-lg mx-auto mt-8">
        <CardContent>
            <Typography variant="h5" className="mb-4">
                Anecdotes
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {anecdotes.map((ad) => (
                            <TableRow
                                key={ad.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={`/anecdotes/${ad.id}`}>{ad.content}</Link>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {ad.author}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    </Card>
)

export default AnecdoteList