'use client';
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ pt: 6, pb: 3, textAlign: "center" }}>
            <Typography>
                © {new Date().getFullYear()} All rights reserved by Group 2 UST
            </Typography>
        </Box>
    );
};

export default Footer;
