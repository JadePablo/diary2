import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function JournalCard({ entry, currentDate, handleViewEntry }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'lightgrey', // Set the background color to light grey
        color: 'black', // Set the text color to black
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: '56.25%',
          backgroundImage: `url(data:image/png;base64,${entry.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          color: 'black', // Set the text color to black
        }}
      >
        <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>
          {entry.entry_title} {/* Use the title from the entry */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(entry.date_created).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentDate < new Date(entry.open_date)
            ? `Available on: ${new Date(entry.open_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}`
            : ''}
        </Typography>
      </CardContent>
      {currentDate >= new Date(entry.open_date) && (
        <CardActions>
          <Button
            size="small"
            onClick={() => handleViewEntry(entry)}
            sx={{
              bgcolor: '#f5f5f5', // Lighter gray background color
              color: 'black', // Dark shade of gray for the text
              borderRadius: '8px', // Rounded corners
              '&:hover': {
                bgcolor: 'black', // Black background color on hover
                color: 'white', // White text color on hover
              },
            }}
          >
            View
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
