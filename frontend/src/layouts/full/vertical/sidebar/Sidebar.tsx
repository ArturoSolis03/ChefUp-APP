import { Box, Drawer } from "@mui/material";
import AuthLogo from "../../shared/logo/AuthLogo";
import { useContext } from "react";
import SidebarItems from "./SidebarItems";
import { DashboardContext } from "src/context/DashboardContext";
import { Profile } from "./SidebarProfile/Profile";

const Sidebar = () => {
  const {isMobileSidebar , setIsMobileSidebar} = useContext(DashboardContext);
  return (
    <>
        <Drawer
          anchor="left"
          open={isMobileSidebar}
          onClose={() => setIsMobileSidebar(false)}
          variant="temporary"
          slotProps={{
            paper: {
              sx: {
                width: '256px',
                border: "0 !important",
                boxShadow: (theme) => theme.shadows[8],
              },
            }
          }}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Box px={2}>
            <AuthLogo />
          </Box>
          <Profile />
          {/* ------------------------------------------- */}
          {/* Sidebar For Mobile */}
          {/* ------------------------------------------- */}
          <SidebarItems />
        </Drawer>
    </>
  );
};

export default Sidebar;
