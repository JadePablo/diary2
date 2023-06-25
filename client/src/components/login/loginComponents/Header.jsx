import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '10px',
        backgroundColor: 'white',
        fontFamily: 'Arial',
      }}
    >
      <Typography variant="caption" color="black" sx={{ fontSize: '24px'}}>
        <b><i>why?</i></b>
      </Typography>
      <Typography variant="caption" color="black" sx={{ fontSize: '12px'}}>
        <br />
        <i>lock your thoughts and unlock your potential.</i> ok rapid fire features here we go.
        set a lock time for journal entries until a specified date.
        on new year's eve we'll share insight into what/who you talk about the most. and what emotions tend
        to spill in your entries using machine learning. And that is the only time we will bother you via email.

        <b>and most importantly, your data is <s>compromised</s> secure. That was a joke. I promise its secure.</b>
      </Typography>
    </Box>
  );
}

export default Header;
