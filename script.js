const noteContainer = document.getElementById("notesContainer");
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");

function saveNotes() {
  const notes = Array.from(noteContainer.querySelectorAll(".note")).map(
    (note) => note.value
  );
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach((text) => {
    const note = createNoteElement(text);
    noteContainer.appendChild(note);
  });
}

function createNoteElement(text = "") {
  const note = document.createElement("textarea");
  note.classList.add("note");
  note.placeholder = "Nowa notatka...";
  note.value = text;

  note.addEventListener("input", saveNotes);

  note.addEventListener("click", () => {
    document
      .querySelectorAll(".note")
      .forEach((n) => n.classList.remove("selected"));
    note.classList.add("selected");
  });

  return note;
}

loadNotes();

addBtn.addEventListener("click", () => {
  const notes = noteContainer.querySelectorAll(".note");

  if (notes.length >= 7) {
    alert("Nie możesz dodać więcej niż 7 notatek!");
    return;
  }

  const note = createNoteElement();
  noteContainer.appendChild(note);
  saveNotes();
});

removeBtn.addEventListener("click", () => {
  const selectedNote = noteContainer.querySelector(".note.selected");
  if (selectedNote) {
    selectedNote.classList.add("removing");
    selectedNote.addEventListener("transitionend", () => {
      if (selectedNote.parentNode) {
        noteContainer.removeChild(selectedNote);
        saveNotes();
      }
    });
  } else {
    alert("Zaznacz notatkę, którą chcesz usunąć.");
  }
});
