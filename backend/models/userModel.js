const { poolPromise, sql } = require('../config/database');

// Fetch a user by NIK
const getUserByNik = async (nik) => {
  if (!nik) throw new Error('NIK is required to fetch user.');

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nik', sql.VarChar, nik)
      .query('SELECT * FROM Employee WHERE nik = @nik');

    return result.recordset[0] || null; // Return null if no user is found
  } catch (error) {
    console.error('Error fetching user by NIK:', error.message);
    throw new Error('Error fetching user by NIK.');
  }
};

// Fetch all users
const getUserAll = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Employee');
    return result.recordset; // Return the list of users
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    throw new Error('Error fetching all users.');
  }
};

// Create a new user
const createUser = async (nik, name, email, hashedPassword, position) => {
  if (!nik || !name || !email || !hashedPassword || !position) {
    throw new Error('All fields are required to create a user.');
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('nik', sql.VarChar, nik)
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .input('position', sql.VarChar, position)
      .query('INSERT INTO Employee (nik, name, email, password, position) VALUES (@nik, @name, @email, @password, @position)');
    return { nik, name, email, position };
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw new Error('Error creating user.');
  }
};

// Update a user
const updateUser = async (nik, name, email, position) => {
  if (!nik || !name || !email || !position) {
    throw new Error('NIK, Name, Email, and Position are required to update a user.');
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nik', sql.VarChar, nik)
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('position', sql.VarChar, position)
      .query('UPDATE Employee SET name = @name, email = @email, position = @position WHERE nik = @nik');

    if (result.rowsAffected[0] === 0) {
      throw new Error('No user found with the given NIK.');
    }

    return { nik, name, email, position };
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw new Error('Error updating user.');
  }
};

// Delete a user
const deleteUser = async (nik) => {
  if (!nik) throw new Error('NIK is required to delete a user.');

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nik', sql.VarChar, nik)
      .query('DELETE FROM Employee WHERE nik = @nik');

    if (result.rowsAffected[0] === 0) {
      throw new Error('No user found with the given NIK.');
    }

    return { message: `User with NIK ${nik} deleted successfully.` };
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw new Error('Error deleting user.');
  }
};

module.exports = {
  getUserByNik,
  getUserAll,
  createUser,
  updateUser,
  deleteUser,
};
