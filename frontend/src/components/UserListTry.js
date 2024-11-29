import  { React, useEffect, useState } from "react";
import '../css/UserList.css';
import axios from "axios";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [edit, setEdit] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const [deleteUser, setDeleteUser] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    
    
    
    // editing the user
    
    const handleEdit = (user) => {
        const id = user.id;
        setEditingUserId(user.id); // Set the current user being edited
        setEditedUserData({ ...user }); // Copy user data for editing
    };
    
    
    useEffect(() => {
        if (edit) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost/assessment/backend/api.php?id=${selectedUserId}`
                    );
                    
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            
            fetchUserDetails();
        }
    }, [edit, selectedUserId]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // end of editing the user
    
    // deleting the user
    const handleDelete = async (e) => {
        const id = e.target.id;
        setSelectedUserId(id);
        setDeleteUser(true);    
    }
    

    
    useEffect(() => {
        if (deleteUser) {
            const confirm_delete = window.confirm("Are you sure you want to delete this user?");
            const deleteUserDetails = async () => {
                try {
                    const response = await axios.delete(
                        `http://localhost/assessment/backend/api.php?id=${selectedUserId}`
                    );
                    console.log(response.data); // User details
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            if (confirm_delete) {
                deleteUserDetails();
            }
            
            
            deleteUserDetails();
        }
    }, [deleteUser, selectedUserId]);
    
    // end of deleting the user
    
    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost/assessment/backend/api.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                // console.log(response);
                
                const result = await response.json();
                if (response.ok && response.status === 200) {
                    setUsers(result);
                    setError(""); 
                } else {
                    setError(result.message || "Failed to fetch users");
                }
            } catch (error) {
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, []);
    
    return (
        <div>
        {/* Show error message */}
        {error && <p style={{ color: "#e29578" }}>{error}</p>}
        
        {/* Show loading message */}
        {loading ? (
            <p>Loading...</p>
        ) : users.length > 0 ? (
            // Show table of users
            <table className="ul_table" >
            <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Registered On</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} id={user.id}>
                <td>
                {selectedUserId === user.id ? (
                    <input
                    type="text"
                    name="name"
                    value={selectedUserId.id || ""}
                    onChange={handleInputChange}
                    />
                ) : (
                    user.id
                )}
                </td>
                <td>
                {selectedUserId === user.id ? (
                    <input
                    type="text"
                    name="name"
                    value={selectedUserId.name || ""}
                    onChange={handleInputChange}
                    />
                ) : (
                    user.name
                )}
                </td>
                <td>
                {selectedUserId === user.id ? (
                    <input
                    type="text"
                    name="name"
                    value={selectedUserId.email || ""}
                    onChange={handleInputChange}
                    />
                ) : (
                    user.email
                )}
                </td><td>
                {selectedUserId === user.id ? (
                    <input
                    type="input"
                    name="name"
                    value={selectedUserId.dob || ""}
                    onChange={handleInputChange}
                    />
                ) : (
                    user.dob
                )}
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td> <button type="button" onClick={handleEdit(user)} id={user.id} > Edit </button> </td>
                <td> <button type="button" onClick={handleDelete} id={user.id} > Del </button> </td>
                </tr>
            ))}
            </tbody>
            </table>
            
        ) : (
            // Show message if no users are found
            <p>No users found.</p>
        )}
        
        </div>
        
    );
}
