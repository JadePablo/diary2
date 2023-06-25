import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function HomepageHeader({ handleCreateClick }) {
  return (
    <Box
      sx={{
        bgcolor: 'paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Hey,
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          your entries are below.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={handleCreateClick}
            sx={{
              bgcolor: 'lightgrey',
              color: 'black',
              '&:hover': {
                bgcolor: 'black',
                color: 'white',
              },
            }}
          >
            +
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
