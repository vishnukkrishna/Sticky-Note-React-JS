import React, { useState } from "react";
import Note from "../Note/Note";
import "./NoteContainer.css";
import emptyNoteIcon from "../../assets/empty-note.png";

function NoteContainer(props) {
  const { notes, deleteNote, updateText } = props;
  const [draggedNoteId, setDraggedNoteId] = useState(null);

  const handleDragStart = (id) => {
    setDraggedNoteId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (id) => {
    const draggedNoteIndex = notes.findIndex(
      (note) => note.id === draggedNoteId
    );
    const droppedNoteIndex = notes.findIndex((note) => note.id === id);

    // Prevent unnecessary moves
    if (draggedNoteIndex === droppedNoteIndex) return;

    const updatedNotes = [...notes];
    const [removedNote] = updatedNotes.splice(draggedNoteIndex, 1);
    updatedNotes.splice(droppedNoteIndex, 0, removedNote);

    props.updateNotes(updatedNotes); // Call the method to update the notes in the parent component
    setDraggedNoteId(null);
  };

  const renderNotes = () => {
    if (notes.length === 0) {
      return (
        <div className="empty-notes">
          <img src={emptyNoteIcon} alt="Empty Note" />
        </div>
      );
    }

    return notes.map((note) => (
      <Note
        key={note.id}
        note={note}
        deleteNote={deleteNote}
        updateText={updateText}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    ));
  };

  return (
    <div className="note-container">
      <h2>Sticky Notes</h2>
      <div className="note-container_notes custom-scroll">{renderNotes()}</div>
    </div>
  );
}

export default NoteContainer;
