import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

function emptyForm() {
  return {
    title: "",
    formula: "",
    subject: "",
    noteType: "Formula",
    explanation: "",
    example: "",
    tags: "",
  };
}

function text(value) {
  return typeof value === "string" ? value : "";
}

function dateValue(value) {
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function useNotes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [pageError, setPageError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;
    let request = 0;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const currentRequest = ++request;

      setUser(currentUser);
      setLoading(true);
      setSubjects([]);
      setNotes([]);
      setStorageReady(false);
      setPageError("");
      setSearchQuery("");
      setSelectedSubject("");
      setFavouritesOnly(false);
      setModalOpen(false);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      const messages = [];

      try {
        const saved = localStorage.getItem(
          `dreamutrack-formulas-${currentUser.uid}`,
        );

        const parsed = saved ? JSON.parse(saved) : [];

        if (
          !Array.isArray(parsed) ||
          parsed.some(
            (note) =>
              !note ||
              typeof note !== "object" ||
              !["string", "number"].includes(typeof note.id),
          )
        ) {
          throw new Error("Invalid saved notes");
        }

        setNotes(parsed);
        setStorageReady(true);
      } catch {
        messages.push(
          "Saved notes could not be read. Changes are disabled to protect your existing data.",
        );
      }

      try {
        const snapshot = await getDoc(doc(db, "users", currentUser.uid));

        if (!active || currentRequest !== request) return;

        const values = snapshot.exists()
          ? snapshot.data().profile?.subjects
          : [];

        setSubjects(
          Array.isArray(values)
            ? [
                ...new Set(
                  values.filter(
                    (subject) => typeof subject === "string" && subject.trim(),
                  ),
                ),
              ]
            : [],
        );
      } catch {
        messages.push(
          "Your profile subjects could not be loaded. Notes already saved in this browser are still available.",
        );
      }

      if (active && currentRequest === request) {
        setPageError(messages.join(" "));
        setLoading(false);
      }
    });

    return () => {
      active = false;
      request += 1;
      unsubscribe();
    };
  }, []);

  const subjectOptions = useMemo(
    () =>
      [
        ...new Set([
          ...subjects,
          ...notes.map((note) => text(note.subject)).filter(Boolean),
          "General",
        ]),
      ].sort((a, b) => a.localeCompare(b)),
    [subjects, notes],
  );

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return notes
      .filter((note) => {
        const tags = Array.isArray(note.tags) ? note.tags : [];

        const searchableText = [
          note.title,
          note.formula,
          note.explanation,
          note.example,
          note.subject,
          ...tags,
        ]
          .map(text)
          .join(" ")
          .toLowerCase();

        return (
          (!query || searchableText.includes(query)) &&
          (!selectedSubject || note.subject === selectedSubject) &&
          (!favouritesOnly || note.favourite)
        );
      })
      .sort((a, b) => {
        const favouriteDifference =
          Number(Boolean(b.favourite)) - Number(Boolean(a.favourite));

        return (
          favouriteDifference || dateValue(b.createdAt) - dateValue(a.createdAt)
        );
      });
  }, [notes, searchQuery, selectedSubject, favouritesOnly]);

  function persist(updated) {
    if (!user || auth.currentUser?.uid !== user.uid || !storageReady) {
      throw new Error("Notes are not ready for saving.");
    }

    localStorage.setItem(
      `dreamutrack-formulas-${user.uid}`,
      JSON.stringify(updated),
    );

    setNotes(updated);
  }

  function openAdd() {
    if (!storageReady) return;

    setEditingId(null);
    setForm(emptyForm());
    setFormError("");
    setModalOpen(true);
  }

  function openEdit(note) {
    if (!storageReady) return;

    setEditingId(note.id);

    setForm({
      title: text(note.title),
      formula: text(note.formula),
      subject: text(note.subject),
      noteType: note.noteType || "Formula",
      explanation: text(note.explanation),
      example: text(note.example),
      tags: Array.isArray(note.tags) ? note.tags.join(", ") : "",
    });

    setFormError("");
    setModalOpen(true);
  }

  function updateForm(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function saveNote() {
    if (!form.title.trim() || !form.formula.trim()) {
      setFormError("Please enter a title and a formula or key point.");
      return;
    }

    const existing =
      editingId !== null ? notes.find((note) => note.id === editingId) : null;

    if (editingId !== null && !existing) {
      setFormError(
        "This note is no longer available. Close the form and try again.",
      );
      return;
    }

    const savedNote = {
      ...(existing || {}),
      id:
        existing?.id ??
        `formula-${
          globalThis.crypto?.randomUUID?.() ||
          `${Date.now()}-${Math.random().toString(36).slice(2)}`
        }`,
      title: form.title.trim(),
      formula: form.formula.trim(),
      subject: form.subject || "General",
      noteType: form.noteType,
      explanation: form.explanation.trim(),
      example: form.example.trim(),
      tags: [
        ...new Set(
          form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        ),
      ],
      favourite: existing?.favourite ?? false,
      createdAt: existing?.createdAt || new Date().toISOString(),
    };

    const updated = existing
      ? notes.map((note) => (note.id === editingId ? savedNote : note))
      : [...notes, savedNote];

    try {
      persist(updated);
      setModalOpen(false);
      setEditingId(null);
    } catch {
      setFormError(
        "Unable to save this note. Check browser storage and try again.",
      );
    }
  }

  function deleteNote(id) {
    if (!window.confirm("Delete this note? This cannot be undone.")) {
      return;
    }

    try {
      persist(notes.filter((note) => note.id !== id));
    } catch {
      setPageError("Unable to delete this note from browser storage.");
    }
  }

  function toggleFavourite(id) {
    try {
      persist(
        notes.map((note) =>
          note.id === id ? { ...note, favourite: !note.favourite } : note,
        ),
      );
    } catch {
      setPageError("Unable to update favourites in browser storage.");
    }
  }

  function clearFilters() {
    setSearchQuery("");
    setSelectedSubject("");
    setFavouritesOnly(false);
  }

  return {
    user,
    loading,
    storageReady,
    pageError,
    notes,
    filteredNotes,
    subjectOptions,
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
    favouritesOnly,
    setFavouritesOnly,
    clearFilters,
    modalOpen,
    editingId,
    form,
    formError,
    updateForm,
    openAdd,
    openEdit,
    saveNote,
    deleteNote,
    toggleFavourite,
    closeModal: () => setModalOpen(false),
  };
}
