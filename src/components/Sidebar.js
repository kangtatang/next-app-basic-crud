import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";

const SidebarContent = ({ onClose, isMobile, theme }) => (
  <>
    {isMobile && (
      <Toolbar>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    )}
    <List>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link href="/" underline="none" color="inherit">
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              style: {
                color: theme.palette.grey[700], // Adjust the color as needed
              },
            }}
          />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Link href="/dashboard" underline="none" color="inherit">
          <ListItemText
            primary="Employee"
            primaryTypographyProps={{
              style: {
                color: theme.palette.grey[700], // Adjust the color as needed
              },
            }}
          />
        </Link>
      </ListItemButton>
    </List>
  </>
);

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      sx={{
        width: 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 250,
          boxSizing: "border-box",
          top: isMobile ? 0 : 64,
        }, // 64px is the height of the AppBar
      }}
    >
      <SidebarContent onClose={onClose} isMobile={isMobile} theme={theme} />
    </Drawer>
  );
};

export default Sidebar;

// import React from "react";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Toolbar from "@mui/material/Toolbar";
// import Link from "@mui/material/Link";
// import ListItemButton from "@mui/material/ListItemButton";

// const Sidebar = ({ open, onClose }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Drawer
//       variant={isMobile ? "temporary" : "permanent"}
//       open={open}
//       onClose={onClose}
//       sx={{
//         width: 250,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: {
//           width: 250,
//           boxSizing: "border-box",
//           top: isMobile ? 0 : 64,
//         }, // 64px is the height of the AppBar
//       }}
//     >
//       {isMobile && (
//         <Toolbar>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Toolbar>
//       )}
//       <List>
//         <ListItemButton>
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <Link href="/" underline="none" color="inherit">
//             <ListItemText
//               primary="Dashboard"
//               primaryTypographyProps={{
//                 style: {
//                   color: theme.palette.grey[700], // Adjust the color as needed
//                 },
//               }}
//             />
//           </Link>
//         </ListItemButton>
//         <ListItemButton>
//           <ListItemIcon>
//             <PeopleIcon />
//           </ListItemIcon>
//           <Link href="/dashboard" underline="none" color="inherit">
//             <ListItemText
//               primary="Employee"
//               primaryTypographyProps={{
//                 style: {
//                   color: theme.palette.grey[700], // Adjust the color as needed
//                 },
//               }}
//             />
//           </Link>
//         </ListItemButton>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
