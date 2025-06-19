import { FC } from 'react';
import { styled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router';
// import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Header from './vertical/header/Header';
import Footer from './shared/footer/Footer';

const MainWrapper = styled('div')(() => ({}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout: FC = () => {

  return (
    <>
      <MainWrapper>
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {<Header />}
        {<Sidebar />}
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}

        <PageWrapper
          className="page-wrapper"
          sx={{
            marginTop: "64px"
          }}
        >
          {/* PageContent */}
          <Container
            sx={{
              maxWidth: 'lg',
            }}
          >
            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}

            <Box mt={4} sx={{ minHeight: 'calc(100vh - 260px)' }}>

              <Outlet />
            </Box>
            <Footer />
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
           
        </PageWrapper>
      </MainWrapper>
    </>
  );
};
export default FullLayout;
