import { Box, Avatar, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import SidebarProfileBgImg from 'src/assets/images/backgrounds/sidebar-profile-bg.jpg';

export const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${SidebarProfileBgImg})`,
        borderRadius: '0 !important',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
      }}
    >
      <>
        <Box
          py="28px"
          borderRadius="0 !important"
          sx={{
            px: '30px',
          }}
        >
          <Box className="profile-img" position="relative">
            <Avatar alt="Remy Sharp" src={ProfileImg} sx={{ height: 50, width: 50 }} />
          </Box>
        </Box>
        <IconButton
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
          aria-label="action"
          sx={{ p: 0, width: '100%' }}
        >
          { <Box

            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              py: '4px',
              px: 2,
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: '0 !important',
              width: '100%',
            }}
          >
            <Typography
              variant="h6"
              fontSize="15px"
              color="white"
              fontWeight="400"
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              
            </Typography>
          </Box>
          }
        </IconButton>
      </>
    </Box>
  );
};
