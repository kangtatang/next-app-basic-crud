import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IconButton, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalAdd from "./ModalAdd";
import ModalView from "./ModalView";
import axios from "axios";
import ModalEdit from "./ModalEdit";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function GridTable({ data, fetchData }) {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState({});

  const handleOpenAdd = () => setOpenAddModal(true);
  const handleCloseAdd = () => setOpenAddModal(false);
  const handleCloseView = () => setOpenViewModal(false);
  const handleCloseEdit = () => setOpenEditModal(false);

  const handleEdit = (id) => {
    setOpenEditModal(true);
    getData(id);
  };

  const handleView = (id) => {
    setOpenViewModal(true);
    getData(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Anda yakin akan menghapus data ini?")) {
      try {
        const response = await fetch(`http://localhost:3009/staff/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(`Employee ${id} successfully deleted`);
        fetchData(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting employee:", error.message);
      }
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      // headerClassName: "customHeader",
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
      // headerClassName: "customHeader",
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 200,
      // headerClassName: "customHeader",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
      // headerClassName: "customHeader",
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 350,
      // headerClassName: "customHeader",
      valueGetter: (value, row) => {
        return `${value?.row.firstName || ""} ${value?.row.lastName || ""}`;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleView(params.id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const getData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3009/staff/${id}`);
      setSelectedStaff(response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          "Error fetching staff data:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error(
          "Error fetching staff data: No response received",
          error.request
        );
      } else {
        console.error("Error fetching staff data:", error.message);
      }
    }
  };

  const [searchValue, setSearchValue] = React.useState("");

  return (
    <>
      <Typography variant={"h4"} sx={{ marginTop: "30px" }}>
        Data Staff
      </Typography>
      <hr />
      <div style={{ marginTop: "30px", width: "100%" }}>
        <div
          style={{
            marginTop: "30px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleOpenAdd}
            sx={{ mb: 2 }}
          >
            Tambah Data
          </Button>
          <TextField
            label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </div>

        <DataGrid
          component={Paper}
          // rows={data}
          rows={data.filter((row) =>
            Object.values(row).some(
              (value) =>
                value &&
                value
                  .toString()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
            )
          )}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableSelectionOnClick
          checkboxSelection={false}
          isRowSelectable={() => false}
        />
      </div>
      <ModalAdd
        open={openAddModal}
        handleClose={handleCloseAdd}
        onSuccess={fetchData}
      />
      <ModalView
        open={openViewModal}
        handleClose={handleCloseView}
        data={selectedStaff}
      />
      <ModalEdit
        open={openEditModal}
        handleClose={handleCloseEdit}
        data={selectedStaff}
        onSuccess={fetchData}
      />
    </>
  );
}
