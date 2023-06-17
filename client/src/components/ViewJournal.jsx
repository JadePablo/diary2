import React from 'react';
import { Typography, TextField, Box, Card, CardContent, CardMedia, CardActionArea, CardActions, Button, Container } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';

const items = [
  {
    id: 1,
    title: 'Card 1',
    description: 'Description 1',
    imageUrl: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'Description 2',
    imageUrl: 'https://via.placeholder.com/300',
  },
  {
    id: 3,
    title: 'Card 3',
    description: 'Description 3',
    imageUrl: 'https://via.placeholder.com/300',
  },
];

const ViewJournal = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        My Title
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        My Blurb
      </Typography>
      <TextField
        id="my-textbox"
        label="Large Textbox"
        variant="outlined"
        multiline
        rows={6}
        fullWidth
      />
      <Box mt={4}>
        <Carousel>
          {items.map((item) => (
            <Card key={item.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imageUrl}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default ViewJournal;
