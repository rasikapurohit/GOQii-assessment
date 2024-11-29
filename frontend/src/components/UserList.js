import React, { useEffect, useState } from "react";
import "../css/UserList.css";
import axios from "axios";

export default function UserListTest() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const [deleteUser, setDeleteUser] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // get all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost/assessment/backend/api.php");
                setUsers(response.data);
                setError("");
            } catch (error) {
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // edit user start
    const handleEditClick = (user) => {
        setEditingUserId(user.id); 
        setEditedUserData({ ...user }); 
    };

    // on Cancel edit
    const handleCancelEdit = () => {
        setEditingUserId(null);
        setEditedUserData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // on Save changes
    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `http://localhost/assessment/backend/api.php?id=${editingUserId}`,
                editedUserData
            );
            if (response.status === 200) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === editingUserId ? { ...user, ...editedUserData } : user
                    )
                );
                setEditingUserId(null);
                setEditedUserData({});
                alert("User details updated successfully!!")
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to save changes.");
        }
    };
    // end of edit user

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

    return (
        <div>
            {error && <p style={{ color: "#e29578" }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : users.length > 0 ? (
                <table className="ul_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Registered On</th>
                            <th>Edit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedUserData.name || ""}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedUserData.email || ""}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            type="date"
                                            name="dob"
                                            value={editedUserData.dob || ""}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.dob
                                    )}
                                </td>

                                <td>{new Date(user.created_at).toLocaleDateString()}</td>

                                <td>
                                    {editingUserId === user.id ? (
                                        <div>
                                            <button
                                                className="btn btn-success"
                                                onClick={handleSaveChanges}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleEditClick(user)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                                <td>
                                <button type="button" onClick={handleDelete} id={user.id} > Del </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}
