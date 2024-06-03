import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField, Button, Grid, Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #666",
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First Name harus memiliki minimal 3 karakter")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name harus memiliki minimal 3 karakter")
    .required("Last Name is required"),
  age: Yup.number()
    .typeError("Age harus berupa angka")
    .required("Age is required")
    .positive("Age harus positif")
    .integer("Age harus berupa bilangan bulat"),
});

export default function ModalEdit({ open, handleClose, onSuccess, data }) {
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
            Edit Data #{data.id}
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={12}>
              <Formik
                enableReinitialize
                initialValues={{
                  firstName: data.firstName || "",
                  lastName: data.lastName || "",
                  age: data.age || "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const response = await fetch(
                      `http://localhost:3009/staff/${data.id}`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                      }
                    );

                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const responseData = await response.json();
                    console.log("Data successfully posted:", responseData);
                    onSuccess();
                    resetForm();
                    handleClose();
                    // Optionally, you can update the state or perform other actions here
                  } catch (error) {
                    console.error("Error posting data:", error.message);
                    handleClose();
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          label="First Name"
                          name="firstName"
                          helperText={
                            <ErrorMessage
                              name="firstName"
                              style={{ color: "red" }}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          helperText={
                            <ErrorMessage
                              name="lastName"
                              style={{ color: "red" }}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          label="Age"
                          name="age"
                          type="number"
                          helperText={
                            <ErrorMessage name="age" style={{ color: "red" }} />
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ mr: 2 }}
                          disabled={isSubmitting}
                        >
                          Simpan Data
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                          Batal
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
