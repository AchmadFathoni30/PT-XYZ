import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../components/Sidebar';
import { Select, MenuItem } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [openInsert, setOpenInsert] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [form, setForm] = useState({ nik: '', name: '', email: '', password: '', position: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch users. Please try again later.', 'error');
    }
  };

  // Modal Insert
  const handleOpenInsert = () => {
    setForm({ nik: '', name: '', email: '', password: '', position: '' });
    setOpenInsert(true);
  };

  const handleCloseInsert = () => {
    setOpenInsert(false);
  };

  const saveUser = async () => {
    try {
      if (!form.nik || !form.name || !form.email || !form.position) {
        Swal.fire('Error', 'Please fill in all required fields.', 'error');
        return;
      }
      await axios.post('http://localhost:5000/api/register', form);
      Swal.fire('Success', 'User added successfully!', 'success');
      fetchData();
      handleCloseInsert();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to save user. Please try again.';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  // Modal Update
  const handleOpenUpdate = (user) => {
    setForm(user);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const updateUser = async () => {
    try {
      if (!form.name || !form.email || !form.position) {
        Swal.fire('Error', 'Please fill in all required fields.', 'error');
        return;
      }
      await axios.put(`http://localhost:5000/api/update`, form);
      Swal.fire('Success', 'User updated successfully!', 'success');
      fetchData();
      handleCloseUpdate();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update user. Please try again.';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const deleteUser = async (nik) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/users/${nik}`);
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          fetchData();
        } catch (error) {
          Swal.fire('Error', 'Failed to delete user. Please try again.', 'error');
        }
      }
    });
  };

  return (
    <Sidebar>
      <Button variant="contained" color="primary" onClick={handleOpenInsert}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NIK</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.nik}>
                <StyledTableCell>{user.nik}</StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.position}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleOpenUpdate(user)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteUser(user.nik)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Insert */}
      <Modal open={openInsert} onClose={handleCloseInsert} aria-labelledby="modal-insert-title">
        <Box sx={modalStyle}>
          <Typography id="modal-insert-title" variant="h6">
            Add User
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="NIK"
            name="nik"
            value={form.nik}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          {/* Dropdown for Position */}
          <Select
            fullWidth
            value={form.position}
            onChange={(e) => handleChange({ target: { name: 'position', value: e.target.value } })}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="" disabled>
              Select Position
            </MenuItem>
            <MenuItem value="Senior Manager">Senior Manager</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
          </Select>

          <Button variant="contained" color="primary" onClick={saveUser} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>


      {/* Modal Update */}
      <Modal open={openUpdate} onClose={handleCloseUpdate} aria-labelledby="modal-update-title">
        <Box sx={modalStyle}>
          <Typography id="modal-update-title" variant="h6">
            Edit User
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="NIK"
            name="nik"
            value={form.nik}
            onChange={handleChange}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          {/* Dropdown for Position */}
          <Select
            fullWidth
            value={form.position}
            onChange={(e) => handleChange({ target: { name: 'position', value: e.target.value } })}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="" disabled>
              Select Position
            </MenuItem>
            <MenuItem value="Senior Manager">Senior Manager</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
          </Select>

          <Button variant="contained" color="primary" onClick={updateUser} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>

    </Sidebar>
  );
}
