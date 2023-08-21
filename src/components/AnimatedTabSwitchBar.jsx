import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

const AnimatedTabSwitchBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [overlayStyles, setOverlayStyles] = useState({});

  const handleTabClick = (index) => {
    const activeTabWidth = 100 / 3; // Assuming 3 tabs
    const overlayLeft = activeTabWidth * index + '%';

    setOverlayStyles({
      transform: '',
      left: overlayLeft,
      transition: 'left 0.3s ease-in-out',
    });
    setActiveTab(index);
  };

  return (
    <Box
      display="inline"
      borderRadius="50px"
      bgcolor="#e0e0e0"
      padding={2}
    >
      <Box
        height="100%"
        bgcolor="red"
        style={overlayStyles}
        borderRadius="50px"
        opacity={0.3}
      />

      <Button
        onClick={() => handleTabClick(0)}
        sx={{ borderRadius: '50px 0 0 50px' }}
      >
        Tab 1
      </Button>

      <Button
        onClick={() => handleTabClick(1)}
      >
        Tab 2
      </Button>

      <Button
        onClick={() => handleTabClick(2)}
        sx={{  borderRadius: '0 50px 50px 0' }}
      >
        Tab 3
      </Button>
    </Box>
  );
};

export default AnimatedTabSwitchBar;