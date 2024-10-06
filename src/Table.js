import React, { useEffect, useState } from 'react';

const Table = () => {
  let [post, setPost] = useState([]);
  let [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    lat: '',
    lng: '',
    phone: '',
    website: '',
    companyName: ''
  });

  let [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json();
    setPost(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing user
      setPost(
        post.map((item) =>
          item.id === formData.id
            ? {
                ...item,
                name: formData.name,
                username: formData.username,
                email: formData.email,
                address: { geo: { lat: formData.lat, lng: formData.lng } },
                phone: formData.phone,
                website: formData.website,
                company: { name: formData.companyName },
              }
            : item
        )
      );
      setIsEditing(false);
    } else {
      // Add new user
      const newUser = {
        id: post.length + 1, // Generating ID manually
        name: formData.name,
        username: formData.username,
        email: formData.email,
        address: {
          geo: {
            lat: formData.lat,
            lng: formData.lng,
          },
        },
        phone: formData.phone,
        website: formData.website,
        company: {
          name: formData.companyName,
        },
      };

      // Add new user to the post array
      setPost([...post, newUser]);
    }

    // Reset form
    setFormData({
      id: '',
      name: '',
      username: '',
      email: '',
      lat: '',
      lng: '',
      phone: '',
      website: '',
      companyName: ''
    });
  };

  // Delete user
  const handleDelete = (id) => {
    const filteredUsers = post.filter((item) => item.id !== id);
    setPost(filteredUsers);
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      lat: user.address.geo.lat,
      lng: user.address.geo.lng,
      phone: user.phone,
      website: user.website,
      companyName: user.company.name
    });
    setIsEditing(true);
  };

  return (
    <div>
      {/* Form to add or edit user */}
      <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lat"
          placeholder="Latitude"
          value={formData.lat}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lng"
          placeholder="Longitude"
          value={formData.lng}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>

      {/* Table to display users */}
      <h2>User List</h2>
      <table border="2px solid black" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address (Lat, Lng)</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {post?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>
                {item.address.geo.lat}, {item.address.geo.lng}
              </td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
              <td>{item.company.name}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
