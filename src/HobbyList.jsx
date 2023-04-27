import React, { useState } from "react";
import Hobby from "./Hobby";

function HobbyList() {
  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState("");

  React.useEffect(() => {
    fetch("http://localhost:3000/hobbies")
      .then((response) => response.json())
      .then((data) => setHobbies(data));
  }, []);

  function deleteHobby(hobbyToDelete) {
    fetch(`http://localhost:3000/hobbies/${hobbyToDelete.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())      .then((data) => {
        console.log(data);
        setHobbies(hobbies.filter((hobby) => hobby.id !== hobbyToDelete.id));
      });
  }

  function addHobby() {
    const hobby = { name: newHobby };

    fetch("http://localhost:3000/hobbies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hobby),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHobbies([...hobbies, data]);
        setNewHobby("");
      });
  }

  return (
    <div>
      <h2>My Hobbies</h2>
      <ul>
        {hobbies.map((hobby) => (
          <Hobby key={hobby.id} hobby={hobby} onDelete={deleteHobby} />
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addHobby();
        }}
      >
        <input
          type="text"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
        />
        <button>Add Hobby</button>
      </form>
    </div>
  );
}

export default HobbyList;
