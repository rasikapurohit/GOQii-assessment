import { useState } from "react";
import "./css/App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";

const content = [
  [
    <UserList />
   
  ],
  [
    <Form />
  ]
];

export default function App() {
  const [activeContentIndex, setActiveContentIndex] = useState(0);

  return (
    <div>
      <header>
        <div>
          <h1>User Management Portal</h1>
        </div>
      </header>

      <div id="tabs">
        <menu>
          <button
            className={activeContentIndex === 0 ? "active" : ""}
            onClick={() => setActiveContentIndex(0)}
          >
            View User
          </button>
          <button
            className={activeContentIndex === 1 ? "active" : ""}
            onClick={() => setActiveContentIndex(1)}
          >
            Add User
          </button>
        </menu>
        
        
        <div id="tab-content">
          <ul>
            {content[activeContentIndex].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
