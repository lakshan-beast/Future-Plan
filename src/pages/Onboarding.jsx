import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Clock,
  //   BookOpen,
  Plus,
} from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [examLevel, setExamLevel] = useState("");
  const [stream, setStream] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [customSubject, setCustomSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [dailyHours, setDailyHours] = useState(4);

  const olMainSubjects = [
    "Sinhala",
    "Mathematics",
    "Science",
    "English",
    "History",
    "Religion",
  ];

  const olOptionalGroups = {
    "Group 01": ["Commerce", "Geography", "Civil Technology", "Agriculture"],
    "Group 02": [
      "Music",
      "Drama",
      "Dancing",
      "Sinhala Literature",
      "English Literature",
    ],
    "Group 03": ["ICT", "Technology", "Health", "Home Economics"],
  };

  const alStreams = {
    Maths: ["Combined Maths", "Physics", "Chemistry", "ICT"],
    "Biological Science": ["Biology", "Physics", "Chemistry", "Agriculture"],
    Technology: [
      "Engineering Technology",
      "Science for Technology",
      "ICT",
      "Physics",
    ],
    Commerce: [
      "Business Studies",
      "Economics",
      "Accounting",
      "Business Statistics",
    ],
    Arts: ["Sinhala", "Political Science", "Geography", "History", "Logic"],
  };

  const toggleSubject = (subject) => {
    setSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  };

  const addCustomSubject = () => {
    if (customSubject.trim() && !subjects.includes(customSubject.trim())) {
      setSubjects([...subjects, customSubject.trim()]);
      setCustomSubject("");
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    const setup = {
      examLevel,
      stream,
      subjects,
      examDate,
      dailyHours,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("dreamutrack-setup", JSON.stringify(setup));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                s <= step
                  ? "bg-indigo-500 text-white"
                  : "bg-white/10 text-white/40"
              }`}>
              {s <= step ? <Check size={16} /> : s}
            </div>
          ))}
        </div>

        {/* Step 1: Exam level */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Choose your exam level</h2>
            <p className="text-white/60 mb-6">
              Select whether you are preparing for O/L or A/L.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {["O/L", "A/L"].map((level) => (
                <button
                  key={level}
                  onClick={() => setExamLevel(level)}
                  className={`rounded-2xl border p-6 text-left transition ${
                    examLevel === level
                      ? "border-indigo-400 bg-indigo-500/20"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}>
                  <GraduationCap size={24} className="mb-3 text-indigo-300" />
                  <div className="font-semibold">{level}</div>
                  <div className="text-sm text-white/50">
                    {level === "O/L" ? "Ordinary Level" : "Advanced Level"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Stream (A/L only) */}
        {step === 2 && examLevel === "A/L" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Choose your stream</h2>
            <p className="text-white/60 mb-6">Select your A/L stream.</p>

            <div className="grid grid-cols-2 gap-4">
              {Object.keys(alStreams).map((s) => (
                <button
                  key={s}
                  onClick={() => setStream(s)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    stream === s
                      ? "border-indigo-400 bg-indigo-500/20"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}>
                  <div className="font-semibold">{s}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Subjects */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Select your subjects</h2>
            <p className="text-white/60 mb-6">
              Choose the subjects you are studying.
            </p>

            {examLevel === "O/L" && (
              <div>
                <h3 className="text-sm font-semibold text-white/70 mb-3">
                  Main subjects
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {olMainSubjects.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => toggleSubject(sub)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        subjects.includes(sub)
                          ? "bg-indigo-500 text-white"
                          : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                      }`}>
                      {sub}
                    </button>
                  ))}
                </div>

                <h3 className="text-sm font-semibold text-white/70 mb-3">
                  Optional subjects
                </h3>
                {Object.entries(olOptionalGroups).map(([group, subs]) => (
                  <div key={group} className="mb-4">
                    <p className="text-xs text-white/40 mb-2">{group}</p>
                    <div className="flex flex-wrap gap-2">
                      {subs.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => toggleSubject(sub)}
                          className={`rounded-full px-4 py-2 text-sm transition ${
                            subjects.includes(sub)
                              ? "bg-indigo-500 text-white"
                              : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                          }`}>
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {examLevel === "A/L" && (
              <div>
                <h3 className="text-sm font-semibold text-white/70 mb-3">
                  {stream} subjects
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {alStreams[stream]?.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => toggleSubject(sub)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        subjects.includes(sub)
                          ? "bg-indigo-500 text-white"
                          : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                      }`}>
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom subject */}
            <div className="mt-6">
              <label className="block text-sm text-white/70 mb-2">
                Add custom subject
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="e.g. Entrepreneurship Studies"
                  className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
                />
                <button
                  onClick={addCustomSubject}
                  className="rounded-xl bg-indigo-500 px-4 py-3 hover:bg-indigo-600 transition">
                  <Plus size={18} />
                </button>
              </div>

              {subjects.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {subjects.map((sub) => (
                    <span
                      key={sub}
                      className="rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-sm">
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Exam date */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Set your exam date</h2>
            <p className="text-white/60 mb-6">
              This will be used for your countdown.
            </p>

            <div className="relative">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={18}
              />
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
              />
            </div>
          </div>
        )}

        {/* Step 5: Daily study hours */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Set your daily study target
            </h2>
            <p className="text-white/60 mb-6">
              How many hours can you study per day?
            </p>

            <div className="relative">
              <Clock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={18}
              />
              <input
                type="number"
                min="1"
                max="16"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">
                📚 You selected {subjects.length} subjects and plan to study{" "}
                {dailyHours} hours per day.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition disabled:opacity-40">
            <ChevronLeft size={16} />
            Back
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold hover:opacity-90 transition">
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold hover:opacity-90 transition">
              Save & Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
