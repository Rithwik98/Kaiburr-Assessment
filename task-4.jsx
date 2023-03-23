import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  const createUser = async () => {
    const response = await axios.post('/api/users', { name: newUser });
    setUsers([...users, response.data]);
    setNewUser('');
  };

  const deleteUser = async (userId) => {
    await axios.delete(`/api/users/${userId}`);
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => { e.preventDefault(); createUser(); }}>
        <input type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;
