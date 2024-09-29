import React, { useState, useEffect } from "react";
import "./App.css";
import NoteContainer from "./components/NoteContainer/NoteContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function App() {
  const MySwal = withReactContent(Swal);
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );

  const addNote = (color) => {
    const newNote = {
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    MySwal.fire({
      title: <p style={{ fontSize: "1.5rem" }}>Are you sure?</p>,
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        title: "my-title-class",
        popup: "my-popup-class",
        confirmButton: "my-confirm-button-class",
        cancelButton: "my-cancel-button-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const tempNotes = [...notes];
        const index = tempNotes.findIndex((item) => item.id === id);
        if (index < 0) return;
        tempNotes.splice(index, 1);
        setNotes(tempNotes);
        MySwal.fire({
          title: <p style={{ fontSize: "1.2rem" }}>Deleted!</p>,
          icon: "success",
          timer: 350,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  const updateNotes = (newNotes) => {
    setNotes(newNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <Sidebar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
        updateNotes={updateNotes} // Pass the updateNotes function here
      />
    </div>
  );
}

export default App;
