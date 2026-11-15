import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

const emptyForm = () => ({
  paperType: "Past Paper",
  subject: "",
  paperName: "",
  marks: "",
  errors: [],
});

export function usePractice() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [pageError, setPageError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    let active = true;
    let request = 0;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const currentRequest = ++request;

      setUser(currentUser);
      setLoading(true);
      setSubjects([]);
      setPapers([]);
      setPageError("");
      setSelectedSubject("");
      setModalOpen(false);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      const uid = currentUser.uid;
      const messages = [];

      try {
        const key = `dreamutrack-papers-${uid}`;
        let saved = localStorage.getItem(key);

        // Preserves the existing legacy migration behavior.
        if (!saved) {
          const legacy = localStorage.getItem("dreamutrack-papers");

          if (legacy) {
            localStorage.setItem(key, legacy);
            saved = legacy;
          }
        }

        const parsed = saved ? JSON.parse(saved) : [];

        if (!Array.isArray(parsed)) {
          throw new Error("Invalid paper data");
        }

        if (active && currentRequest === request) {
          setPapers(parsed);
        }
      } catch {
        messages.push(
          "Saved papers could not be read. Check browser storage before adding new records.",
        );
      }

      try {
        const snapshot = await getDoc(doc(db, "users", uid));
        const data = snapshot.exists() ? snapshot.data() : {};
        const values = data.profile?.subjects;

        if (active && currentRequest === request) {
          setSubjects(
            Array.isArray(values)
              ? [...new Set(values.filter((s) => typeof s === "string"))]
              : [],
          );
        }
      } catch {
        messages.push("Your subject list could not be loaded.");
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

  const stats = useMemo(
    () => ({
      total: papers.length,
      past: papers.filter((p) => p.paperType === "Past Paper").length,
      model: papers.filter((p) => p.paperType === "Model Paper").length,
      avg: papers.length
        ? Math.round(
            papers.reduce((sum, p) => sum + Number(p.marks), 0) / papers.length,
          )
        : 0,
    }),
    [papers],
  );

  const subjectPerformance = useMemo(() => {
    const groups = new Map();

    papers.forEach((paper) => {
      const group = groups.get(paper.subject) || { total: 0, count: 0 };

      group.total += Number(paper.marks);
      group.count += 1;

      groups.set(paper.subject, group);
    });

    return [...groups.entries()]
      .map(([subject, group]) => ({
        subject,
        average: Math.round(group.total / group.count),
        count: group.count,
      }))
      .sort((a, b) => b.average - a.average);
  }, [papers]);

  const subjectTrend = useMemo(
    () =>
      papers
        .filter((paper) => paper.subject === selectedSubject)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((paper, index) => ({
          name: paper.paperName || `Paper ${index + 1}`,
          marks: Number(paper.marks),
          type: paper.paperType,
        })),
    [papers, selectedSubject],
  );

  const trendInfo = useMemo(() => {
    if (subjectTrend.length < 2) return null;

    const diff =
      subjectTrend[subjectTrend.length - 1].marks - subjectTrend[0].marks;

    return {
      diff,
      trend: diff > 5 ? "improving" : diff < -5 ? "declining" : "stable",
    };
  }, [subjectTrend]);

  const sortedPapers = useMemo(
    () =>
      [...papers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [papers],
  );

  function updateForm(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm());
    setFormError("");
    setModalOpen(true);
  }

  function openEdit(paper) {
    setEditingId(paper.id);
    setForm({
      paperType: paper.paperType,
      subject: paper.subject,
      paperName: paper.paperName || "",
      marks: paper.marks,
      errors: paper.errors || [],
    });
    setFormError("");
    setModalOpen(true);
  }

  function toggleError(value) {
    setForm((previous) => ({
      ...previous,
      errors: previous.errors.includes(value)
        ? previous.errors.filter((error) => error !== value)
        : [...previous.errors, value],
    }));
  }

  function savePaper() {
    if (!user) return;

    if (!form.subject) {
      setFormError("Please select a subject.");
      return;
    }

    const marks = Number(form.marks);

    if (
      String(form.marks).trim() === "" ||
      !Number.isFinite(marks) ||
      marks < 0 ||
      marks > 100
    ) {
      setFormError("Please enter marks between 0 and 100.");
      return;
    }

    const paper = {
      id: editingId || `paper-${Date.now()}`,
      paperType: form.paperType,
      subject: form.subject,
      paperName: form.paperName.trim(),
      marks,
      errors: form.errors,
      createdAt: editingId
        ? papers.find((item) => item.id === editingId)?.createdAt
        : new Date().toISOString(),
    };

    const updated = editingId
      ? papers.map((item) => (item.id === editingId ? paper : item))
      : [...papers, paper];

    try {
      localStorage.setItem(
        `dreamutrack-papers-${user.uid}`,
        JSON.stringify(updated),
      );
      setPapers(updated);
      setModalOpen(false);
      setEditingId(null);
    } catch {
      setFormError(
        "Unable to save in this browser. Please check storage space.",
      );
    }
  }

  function deletePaper(id) {
    if (!user) return;

    if (!window.confirm("Delete this paper? This cannot be undone.")) {
      return;
    }

    const updated = papers.filter((paper) => paper.id !== id);

    try {
      localStorage.setItem(
        `dreamutrack-papers-${user.uid}`,
        JSON.stringify(updated),
      );
      setPapers(updated);
    } catch {
      setPageError("Unable to delete this paper from browser storage.");
    }
  }

  return {
    user,
    loading,
    subjects,
    stats,
    subjectPerformance,
    subjectTrend,
    trendInfo,
    sortedPapers,
    selectedSubject,
    setSelectedSubject,
    pageError,
    modalOpen,
    editingId,
    form,
    formError,
    updateForm,
    toggleError,
    openAdd,
    openEdit,
    savePaper,
    deletePaper,
    closeModal: () => setModalOpen(false),
  };
}
