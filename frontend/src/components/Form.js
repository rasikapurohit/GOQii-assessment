import { useState } from "react";
import "../css/Form.css";


export default function Form() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    
    
    // Handling the name change
    const handleName = (e) => {

        // console.log(e.keyCode)
        setName(e.target.value);
        var keyCode = e.keyCode; 
        if (keyCode >= 48 && keyCode <= 57) {
          alert("Please enter only alphabets");
        setName(null);
          
        }
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
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (name === "" || email === "" || password === "" || dob === "" || name === null || email === null || password === null || dob === null) {
            setError(true);            
            return;
        }
        setEmail(email.trim());
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError(""); // Clear error if email is valid
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
                const result = await response.json();
                if (result.status === "success" || result.id) {
                    alert(`User ${name} successfully registered!!`);
                } else {
                    alert("Failed to register the user!!");
                }
            } else {
                alert("Failed to register the user!!");
            }
        } catch (error) {
            alert(nameError||emailError||"Failed to register the user!!");
        }
    };
    
    
    
    
    return (
        <div> {error || <p style={{ color: "#e29578" }}> Please fill all details </p>}

        <div className="form">   
        <form>      
        <label className="label">Name</label>
        <input
        onChange={handleName}
        className="input"
        value={name}
        type="text"
        onKeyUp={handleName}
        onKeyDown={handleName}
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
        <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
        </form>
        </div>
        </div>
        
    );
    
}