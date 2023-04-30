import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      id: id,
      name: name,
      email: email,
      phone: phone,
    };
    setUsers([...users, newUser]);
    setName("");
    setId("");
    setEmail("");
    setPhone("");
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      {/* <h1>Search Feature</h1> */}
      <input
        type="text"
        id="search-box"
        placeholder="Search users by name or email"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="wrapper">
        <h1>Users</h1>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id} id="card">
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </li>
          ))}
        </ul>
        <h1>Add Users</h1>
        <form onSubmit={handleSubmit}>
          <label>
            ID:
            <input
              type="text"
              value={id}
              onChange={(event) => setId(event.target.value)}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
}

export default App;
