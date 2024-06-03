import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Head from "next/head";
import GridTable from "@/components/GridTable";
import ProggressChart from "@/components/ProggressChart";
import axios from "axios";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataStaff, setDataStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3009/staff");
      const resultData = response.data.map((item, index) => ({
        ...item,
        nomor: index + 1,
      }));
      setDataStaff(resultData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard Page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Navbar onMenuClick={handleSidebarToggle} />
          <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}>
            <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - 250px)` }, // Adjust as per sidebar width
              }}
            >
              <Container>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <GridTable data={dataStaff} fetchData={fetchData} />
                  </Grid>                 
                </Grid>
              </Container>
            </Box>
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "background.paper" }}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              {new Date().getFullYear()}
              {" Your Company."}
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
