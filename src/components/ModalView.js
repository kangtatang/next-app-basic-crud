import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Paper,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #666",
  boxShadow: 24,
  p: 4,
};

export default function ModalView({ open, handleClose, data }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ mb: 2 }}
            component="h2"
          >
            Detail Data #{data.id}
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>{data.firstName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Last Name</TableCell>
                      <TableCell>{data.lastName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Age</TableCell>
                      <TableCell>{data.age}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleClose}>
                Batal
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
