import React from "react";
import Note from "../Note/Note";
import "./NoteContainer.css";
import emptyNoteIcon from "../../assets/empty-note.png";

function NoteContainer(props) {
  const { notes, deleteNote, updateText } = props;

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
