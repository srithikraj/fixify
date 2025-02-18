import React from "react";
import { Container, Grid, Typography, List, ListItem, ListItemText, Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
 
const footerData = [
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Our Services", path: "/services" },
      { name: "Privacy Policy", path: "/privacy-policy" }
    ],
  },
  {
    title: "Get Help",
    links: [
      { name: "FAQ", path: "/faq" },
      { name: "Contact Us", path: "/contactus" },  // Ensure this path matches your Contact Us page route
      { name: "Support", path: "/support" }
    ],
  },
];
 
const Footer = () => {
  return (
<Box sx={{ backgroundColor: "#455a64", color: "white", py: 6 }}>
<Container>
<Grid container spacing={4} justifyContent="space-between">
          {footerData.map((section, index) => (
<Grid item xs={12} sm={4} md={3} key={index}>
<Typography variant="h6" fontWeight={600} gutterBottom sx={{ borderBottom: "2px solid #e91e63", display: "inline-block", pb: 1 }}>
                {section.title}
</Typography>
<List>
                {section.links.map((link, idx) => (
<ListItem key={idx} sx={{ py: 0 }}>
<Link to={link.path} style={{ textDecoration: "none", color: "inherit" }}>
<ListItemText primary={link.name} primaryTypographyProps={{ color: "grey.400" }} />
</Link>
</ListItem>
                ))}
</List>
</Grid>
          ))}
<Grid item xs={12} sm={4} md={3}>
<Typography variant="h6" fontWeight={600} gutterBottom sx={{ borderBottom: "2px solid #e91e63", display: "inline-block", pb: 1 }}>
              Follow Us
</Typography>
<Box sx={{ display: "flex", gap: 1, mt: 2 }}>
<IconButton sx={{ color: "white" }}><FacebookIcon /></IconButton>
<IconButton sx={{ color: "white" }}><TwitterIcon /></IconButton>
<IconButton sx={{ color: "white" }}><InstagramIcon /></IconButton>
<IconButton sx={{ color: "white" }}><LinkedInIcon /></IconButton>
</Box>
</Grid>
</Grid>
</Container>
</Box>
  );
};
 
export default Footer;