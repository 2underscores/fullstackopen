import { Card, CardContent, Typography } from '@mui/material'


const About = () => (
    <Card className="w-full max-w-lg mx-auto mt-8">
        <CardContent>
            <Typography variant="h5" className="mb-4">About anecdote app</Typography>
            <p>According to Wikipedia:</p>

            <em>An anecdote is a brief, revealing account of an individual person or an incident.
                Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
                such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
                An anecdote is &quot;a story with a point.&quot;</em>

            <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </CardContent>
    </Card>
)

export default About