console.log("Attendance UI loaded successfully!");

const STORAGE_KEYS = {
  teachers: "aas_teachers",
  courses: "aas_courses",
  students: "aas_students",
  assignments: "aas_assignments",
};

function loadList(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

document.addEventListener("DOMContentLoaded", () => {
  initTeachersPage();
  initCoursesPage();
  initAssignCoursesPage();
  initStudentsPage();
  initReportsPage();
  initStartSessionPage();
});

/* ================= TEACHERS ================= */

function initTeachersPage() {
  const idInput = document.getElementById("teacher-id");
  const nameInput = document.getElementById("teacher-name");
  const emailInput = document.getElementById("teacher-email");
  const deptInput = document.getElementById("teacher-dept");
  if (!idInput || !nameInput || !emailInput || !deptInput) return;

  const card = idInput.closest(".card");
  const saveBtn = card.querySelector(".primary-btn");
  const tableBody = card.querySelector("tbody");

  const teachers = loadList(STORAGE_KEYS.teachers, []);

  function render() {
    tableBody.innerHTML = "";
    teachers.forEach(t => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${t.id}</td>
        <td>${t.name}</td>
        <td>${t.dept || "-"}</td>
        <td>${t.email || "-"}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  render();

  saveBtn.addEventListener("click", () => {
    const id = idInput.value.trim();
    const name = nameInput.value.trim();
    if (!id || !name) return alert("Teacher ID and Name required");

    teachers.push({
      id,
      name,
      email: emailInput.value.trim(),
      dept: deptInput.value.trim(),
    });

    saveList(STORAGE_KEYS.teachers, teachers);
    render();

    idInput.value = nameInput.value = emailInput.value = deptInput.value = "";
  });
}

/* ================= COURSES ================= */

function initCoursesPage() {
  const codeInput = document.getElementById("course-code");
  const nameInput = document.getElementById("course-name");
  const creditsInput = document.getElementById("course-credits");
  const teacherSelect = document.getElementById("assigned-teacher");
  if (!codeInput || !nameInput || !creditsInput || !teacherSelect) return;

  const card = codeInput.closest(".card");
  const saveBtn = card.querySelector(".primary-btn");
  const tableBody = card.querySelector("tbody");

  const courses = loadList(STORAGE_KEYS.courses, []);

  function render() {
    tableBody.innerHTML = "";
    courses.forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${c.code}</td>
        <td>${c.name}</td>
        <td>${c.credits || "-"}</td>
        <td>${c.teacher || "-"}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  render();

  saveBtn.addEventListener("click", () => {
    const code = codeInput.value.trim();
    const name = nameInput.value.trim();
    if (!code || !name) return alert("Course code and name required");

    const teacher =
      teacherSelect.value === ""
        ? "-"
        : teacherSelect.options[teacherSelect.selectedIndex].textContent;

    courses.push({
      code,
      name,
      credits: creditsInput.value.trim(),
      teacher,
    });

    saveList(STORAGE_KEYS.courses, courses);
    render();

    codeInput.value = nameInput.value = creditsInput.value = "";
    teacherSelect.value = "";
  });
}

/* ================= ASSIGN COURSES ================= */

function initAssignCoursesPage() {
  const studentSelect = document.getElementById("assign-student");
  const courseSelect = document.getElementById("assign-course");
  const semesterInput = document.getElementById("assign-semester");
  if (!studentSelect || !courseSelect || !semesterInput) return;

  const card = studentSelect.closest(".card");
  const assignBtn = card.querySelector(".primary-btn");
  const tableBody = card.querySelector("tbody");

  const assignments = loadList(STORAGE_KEYS.assignments, []);

  function render() {
    tableBody.innerHTML = "";
    assignments.forEach(a => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${a.studentId}</td>
        <td>${a.studentName}</td>
        <td>${a.courseCode}</td>
        <td>${a.courseName}</td>
        <td>${a.semester || "-"}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  render();

  assignBtn.addEventListener("click", () => {
    if (!studentSelect.value || !courseSelect.value)
      return alert("Select student and course");

    const [studentId, studentName] =
      studentSelect.options[studentSelect.selectedIndex].textContent.split(" - ");
    const [courseCode, courseName] =
      courseSelect.options[courseSelect.selectedIndex].textContent.split(" - ");

    assignments.push({
      studentId,
      studentName,
      courseCode,
      courseName,
      semester: semesterInput.value.trim(),
    });

    saveList(STORAGE_KEYS.assignments, assignments);
    render();

    studentSelect.value = courseSelect.value = semesterInput.value = "";
  });
}

/* ================= STUDENTS ================= */

function initStudentsPage() {
  const noInput = document.getElementById("student-no-input");
  const nameInput = document.getElementById("student-name-input");
  const programInput = document.getElementById("student-program-input");
  const lastAttInput = document.getElementById("student-lastatt-input");
  const statusSelect = document.getElementById("student-status-input");
  const addBtn = document.getElementById("add-student-btn");

  const searchInput = document.getElementById("student-search-input");
  const searchBtn = document.getElementById("student-search-btn");

  if (!noInput || !nameInput || !programInput || !statusSelect || !addBtn) return;

  const tableBody = document.querySelector(".students-table tbody");
  const students = loadList(STORAGE_KEYS.students, []);

  function render(filter = "") {
    tableBody.innerHTML = "";
    students
      .filter(s =>
        !filter ||
        `${s.no} ${s.name} ${s.program}`.toLowerCase().includes(filter.toLowerCase())
      )
      .forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${s.no}</td>
          <td>${s.name}</td>
          <td>${s.program || "-"}</td>
          <td>${s.lastAtt || "-"}</td>
          <td><span class="status-badge ${s.status}">${s.status}</span></td>
        `;
        tableBody.appendChild(tr);
      });
  }

  render();

  addBtn.addEventListener("click", () => {
    if (!noInput.value || !nameInput.value)
      return alert("Student no and name required");

    students.push({
      no: noInput.value.trim(),
      name: nameInput.value.trim(),
      program: programInput.value.trim(),
      lastAtt: lastAttInput.value.trim(),
      status: statusSelect.value,
    });

    saveList(STORAGE_KEYS.students, students);
    render(searchInput?.value);

    noInput.value = nameInput.value = programInput.value = lastAttInput.value = "";
    statusSelect.value = "present";
  });

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => render(searchInput.value));
    searchInput.addEventListener("keyup", e => {
      if (e.key === "Enter") render(searchInput.value);
    });
  }
}

/* ================= REPORTS ================= */

function initReportsPage() {
  const courseSelect = document.getElementById("report-course-filter");
  const sectionSelect = document.getElementById("report-section-filter");
  const startInput = document.getElementById("report-start-date");
  const endInput = document.getElementById("report-end-date");
  const applyBtn = document.getElementById("report-apply-btn");
  const table = document.getElementById("reports-table");

  if (!courseSelect || !sectionSelect || !startInput || !endInput || !applyBtn || !table) return;

  const tbody = table.querySelector("tbody");

  const courses = loadList(STORAGE_KEYS.courses, []);
  if (courses.length) {
    courseSelect.innerHTML = `<option value="">Choose course...</option>`;
    courses.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.code;
      opt.textContent = `${c.code} - ${c.name}`;
      courseSelect.appendChild(opt);
    });
  }

  applyBtn.addEventListener("click", () => {
    const rows = tbody.querySelectorAll("tr");
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const date = new Date(cells[0].textContent.trim());
      const course = cells[1].textContent.trim();
      const section = cells[2].textContent.trim();

      let visible = true;

      if (courseSelect.value && course !== courseSelect.value) visible = false;
      if (sectionSelect.value && section !== sectionSelect.value) visible = false;
      if (startInput.value && date < new Date(startInput.value)) visible = false;
      if (endInput.value && date > new Date(endInput.value)) visible = false;

      row.style.display = visible ? "" : "none";
    });
  });
}
function initStartSessionPage() {
  const courseSelect = document.getElementById("start-course");
  const sectionSelect = document.getElementById("start-section");
  const startBtn = document.getElementById("start-session-btn");
  if (!courseSelect || !sectionSelect || !startBtn) return;

  const courses = loadList(STORAGE_KEYS.courses, []);
  if (courses.length) {
    courseSelect.innerHTML = `<option value="">Choose a course...</option>`;
    courses.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.code;
      opt.textContent = `${c.code} - ${c.name}`;
      courseSelect.appendChild(opt);
    });
  }

  startBtn.addEventListener("click", () => {
    if (!courseSelect.value || !sectionSelect.value) {
      alert("Please select a course and a section.");
      return;
    }

    localStorage.setItem(
      "aas_current_session",
      JSON.stringify({
        courseCode: courseSelect.value,
        courseText: courseSelect.options[courseSelect.selectedIndex].textContent,
        section: sectionSelect.value
      })
    );

    window.location.href = "camera-session.html";
  });
}
