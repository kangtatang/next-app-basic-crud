import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

const Materialtable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3009/employee");
      const resultData = response.data.map((item, index) => ({
        ...item,
        nomor: index + 1,
      }));
      setData(resultData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowAdd = async (newData) => {
    try {
      await axios.post("http://localhost:3009/employee", newData);
      fetchData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleRowUpdate = async (newData, oldData) => {
    try {
      await axios.put(`http://localhost:3009/employee/${oldData.id}`, newData);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleRowDelete = async (oldData) => {
    try {
      await axios.delete(`http://localhost:3009/employee/${oldData.id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <MaterialTable
      title="Contoh Tabel"
      columns={[
        { title: "Nomor", field: "nomor", editable: "never" },
        { title: "Nama", field: "nama" },
        { title: "Telepon", field: "telepon" },
        { title: "Email", field: "email" },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            handleRowAdd(newData).then(resolve).catch(reject);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            handleRowUpdate(newData, oldData).then(resolve).catch(reject);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            handleRowDelete(oldData).then(resolve).catch(reject);
          }),
      }}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default Materialtable;
