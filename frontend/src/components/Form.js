import { useState } from "react";
import "../css/Form.css";
import { ToastContainer, toast } from "react-toastify";


export default function Form() {
    // States for registration
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    
    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };
    
     // Handling the password change
     const handleDob = (e) => {
        setDob(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the form submission
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (name === "" || email === "" || password === "" || dob === "") {
    //         setError(true);
    //     } else {
    //         setSubmitted(true);
    //         setError(false);
    //     }  
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (name === "" || email === "" || password === "" || dob === "") {
            toast.error("Please enter all the fields", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            return;
        }
    
        try {
            const response = await fetch("http://localhost/assessment/backend/api.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, dob }),
            });
    
            if (response.ok) {

                alert(response);

                const result = await response.json();
                alert(result)   
                if (result.status === "success" || result.id) {
                    alert("User {name} successfully registered!!");
                } else {
                   alert("Failed to register the user!!");
                }
            } else {
               alert("Failed to register the user!!");
            }
        } catch (error) {
            alert("Failed to register the user!!");
        }
    };
    
    
    // Showing success message
    // const successMessage = () => {
    //     return (
    //         // <div
    //         // className="success"
    //         // style={{
    //         //     display: submitted ? "" : "none",
    //         // }}
    //         // >
    //         alert("User {name} successfully registered!!")
    //         // </div>
    //     );
    // };
    
    
    
    // Showing error message if error is true
    // const errorMessage = () => {
    //     return (
    //         <div
    //         className="error"
    //         style={{
    //             display: error ? "" : "none",
                
    //         }}
            
    //         >
            
    //         <h1>Please enter all the fields</h1>
            
    //         </div>
            
    //     );
        
    // };
    
    
    
    return (
        <div className="form">

        {/* Calling to the methods */}
        

        
        
        
        <form>
        
        {/* Labels and inputs for form data */}
        
        <label className="label">Name</label>
        
        <input
        onChange={handleName}
        className="input"
        value={name}
        type="text"
        />
        
        
        
        <label className="label">Email</label>
        
        <input
        onChange={handleEmail}
        className="input"
        value={email}
        type="email"
        />
        
        <label className="label">Password</label>
        
        <input
        onChange={handlePassword}
        className="input"
        value={password}
        type="password"
        />

    <label className="label">Date of Birth</label>     
        <input       
        onChange={handleDob}
        className="input"
        value={dob}
        type="date"
        />

        <br></br>
        <br></br>

        <button onClick={handleSubmit} className="btn" type="submit">
        
        Submit
        
        </button>
        

        
        </form>
        
        </div>
        
    );
    
}