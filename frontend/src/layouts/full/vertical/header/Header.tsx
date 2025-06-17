import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
  Typography,
} from '@mui/material';
import Profile from './Profile';
import Logo from '../../shared/logo/Logo';
import { useEffect, useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { DashboardContext } from 'src/context/DashboardContext';
import { Link } from 'react-router';

const Header = () => {
  const [_height, setHeight] = useState('0px');
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const toggleWidth = '160px';

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none !important',
    background: theme.palette.primary.main,
    justifyContent: 'center',
    position: 'fixed',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.down('md')]: {
      minHeight: '64px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.warning.contrastText,
    gap: '8px',
  }));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setHeight('0px');
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { isMobileSidebar, setIsMobileSidebar } = useContext(DashboardContext);

  const navItems = [
    { label: 'Home', path: '/', icon: 'layers-minimalistic-line-duotone' },
    { label: 'Recipes', path: '/recipes', icon:'book-broken' },
    { label: 'Favorites', path: '/favorites', icon: 'heart-line-duotone'},
  ];

  return (
    <>
      <AppBarStyled color="default">
        <ToolbarStyled>
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}

          {lgUp ? (
            <>
              <Box
                sx={{
                  width: toggleWidth,
                }}
              >
                <Logo />
              </Box>
              {navItems.map((item) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  paddingY: 0.5,
                }}
              >
                <Link to={item.path}>
                  
                  <Typography
                    variant="subtitle2"
                    fontWeight={500}
                    color="white"
                    className="text-hover" component='span'
                    noWrap
                    sx={{
                      mr: '5px',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  >
                    {item.label}
                  </Typography>
                    <Icon icon={"solar:" + item.icon} width="20" height="20"style={{ color: '#fff', display: 'inline-block', verticalAlign: 'middle',}} />
                </Link>
              </Box>
              ))}
            </>
          ) : (
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={lgUp ? () => {} : () => setIsMobileSidebar(!isMobileSidebar)}
            >
              <Icon icon="solar:list-bold" height={20} />
            </IconButton>
          )}
          {/* ------------------------------------------- */}
          {/* Toggle Button Sidebar */}
          {/* ------------------------------------------- */}

          <Box flexGrow={1} />

          {lgUp ? (
            <>
              <Stack spacing={2} direction="row" alignItems="center">
                <Profile />
              </Stack>
            </>
          ) : null}
          {lgUp ? null : (
            <>
              <Stack spacing={2} direction="row" alignItems="center">
                <Profile />
              </Stack>
            </>
          )}
        </ToolbarStyled>
      </AppBarStyled>
    </>
  );
};

export default Header;
