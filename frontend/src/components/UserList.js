import  { React, useEffect, useState } from "react";
import '../css/UserList.css';
import EditIcon from '@mui/icons-material/Edit';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Button } from "bootstrap";
import axios from "axios";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [edit, setEdit] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [deleteUser, setDeleteUser] = useState(false);

    const handleEdit = (e) => {
        const id = e.target.id;
        setSelectedUserId(id);
        setEdit(true);
        // console.log(edit)
    };

    useEffect(() => {
        if (edit) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost/assessment/backend/api.php?id=${selectedUserId}`
                    );
                    console.log(response.data); // User details
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };

            fetchUserDetails();
        }
    }, [edit, selectedUserId]);
    
    // const handleEdit = async (e) => {

    //     const id = e.target.id;
    //     try {
    //         const response = await axios.get(`http://localhost/assessment/backend/api.php?id=${id}`);
    //         console.log(response.data); // User details
    //         setEdit(true); // Update the edit state after fetching data
    //         console.log(edit)
    //     } catch (error) {
    //         console.error("Error fetching user details:", error);
    //     }

    // }

    useEffect(() => {
        console.log('use effect run');
        if(edit){
            console.log('edit is true');
        }
      }, []);
    
    const handleDelete = (e) => {
        console.log(e);
    }
    
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
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td> <button type="button" onClick={handleEdit} id={user.id}> Edit </button> </td>
                <td> <button type="button" onClick={handleDelete}>Del</button> </td>
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
