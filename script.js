console.log("Attendance UI loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    initTeachersPage();
    initCoursesPage();
    initAssignCoursesPage();
    initStudentsPage();
    initReportsPage();
});

function initTeachersPage() {
    const idInput = document.getElementById("teacher-id");
    const nameInput = document.getElementById("teacher-name");
    const emailInput = document.getElementById("teacher-email");
    const deptInput = document.getElementById("teacher-dept");

    if (!idInput || !nameInput || !emailInput || !deptInput) return;

    const card = idInput.closest(".card") || document;
    const saveBtn = card.querySelector(".primary-btn");
    const tableBody = card.querySelector("table.students-table tbody");
    if (!saveBtn || !tableBody) return;

    saveBtn.addEventListener("click", () => {
        const id = idInput.value.trim();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const dept = deptInput.value.trim();

        if (!id || !name) {
            alert("Teacher ID and Full Name are required.");
            return;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${dept || "-"}</td>
            <td>${email || "-"}</td>
        `;
        tableBody.appendChild(row);

        idInput.value = "";
        nameInput.value = "";
        emailInput.value = "";
        deptInput.value = "";
    });
}

function initCoursesPage() {
    const codeInput = document.getElementById("course-code");
    const nameInput = document.getElementById("course-name");
    const creditsInput = document.getElementById("course-credits");
    const teacherSelect = document.getElementById("assigned-teacher");

    if (!codeInput || !nameInput || !creditsInput || !teacherSelect) return;

    const card = codeInput.closest(".card") || document;
    const saveBtn = card.querySelector(".primary-btn");
    const tableBody = card.querySelector("table.students-table tbody");
    if (!saveBtn || !tableBody) return;

    saveBtn.addEventListener("click", () => {
        const code = codeInput.value.trim();
        const name = nameInput.value.trim();
        const credits = creditsInput.value.trim();
        const teacherText =
            teacherSelect.value === ""
                ? "-"
                : teacherSelect.options[teacherSelect.selectedIndex].textContent;

        if (!code || !name) {
            alert("Course Code and Course Name are required.");
            return;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${code}</td>
            <td>${name}</td>
            <td>${credits || "-"}</td>
            <td>${teacherText}</td>
        `;
        tableBody.appendChild(row);

        codeInput.value = "";
        nameInput.value = "";
        creditsInput.value = "";
        teacherSelect.value = "";
    });
}

function initAssignCoursesPage() {
    const studentSelect = document.getElementById("assign-student");
    const courseSelect = document.getElementById("assign-course");
    const semesterInput = document.getElementById("assign-semester");

    if (!studentSelect || !courseSelect || !semesterInput) return;

    const card = studentSelect.closest(".card") || document;
    const assignBtn = card.querySelector(".primary-btn");
    const tableBody = card.querySelector("table.students-table tbody");
    if (!assignBtn || !tableBody) return;

    assignBtn.addEventListener("click", () => {
        const studentVal = studentSelect.value;
        const courseVal = courseSelect.value;
        const semester = semesterInput.value.trim();

        if (!studentVal || !courseVal) {
            alert("Please select both a student and a course.");
            return;
        }

        const studentText =
            studentSelect.options[studentSelect.selectedIndex].textContent;
        const courseText =
            courseSelect.options[courseSelect.selectedIndex].textContent;

        const [studentId, studentName] = studentText.split(" - ");
        const [courseCode, courseName] = courseText.split(" - ");

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${studentId || ""}</td>
            <td>${studentName || studentText}</td>
            <td>${courseCode || ""}</td>
            <td>${courseName || courseText}</td>
            <td>${semester || "-"}</td>
        `;
        tableBody.appendChild(row);

        studentSelect.value = "";
        courseSelect.value = "";
        semesterInput.value = "";
    });
}

function initStudentsPage() {
    const noInput       = document.getElementById("student-no-input");
    const nameInput     = document.getElementById("student-name-input");
    const programInput  = document.getElementById("student-program-input");
    const lastAttInput  = document.getElementById("student-lastatt-input");
    const statusSelect  = document.getElementById("student-status-input");
    const addBtn        = document.getElementById("add-student-btn");

    const searchInput   = document.getElementById("student-search-input");
    const searchBtn     = document.getElementById("student-search-btn");

    if (!noInput || !nameInput || !programInput || !statusSelect || !addBtn) return;

    const tableBody = document.querySelector(".students-table tbody");
    if (!tableBody) return;

    addBtn.addEventListener("click", () => {
        const no       = noInput.value.trim();
        const name     = nameInput.value.trim();
        const program  = programInput.value.trim();
        const lastAtt  = lastAttInput.value.trim();
        const status   = statusSelect.value;

        if (!no || !name) {
            alert("Student No and Full Name are required.");
            return;
        }

        const statusClass = status === "absent" ? "absent" : "present";
        const statusText  = status === "absent" ? "Absent" : "Present";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${no}</td>
            <td>${name}</td>
            <td>${program || "-"}</td>
            <td>${lastAtt || "-"}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        `;
        tableBody.appendChild(row);

        noInput.value = "";
        nameInput.value = "";
        programInput.value = "";
        lastAttInput.value = "";
        statusSelect.value = "present";
    });

    function applyStudentSearch() {
        if (!searchInput) return;
        const query = searchInput.value.trim().toLowerCase();
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display =
                query === "" || text.includes(query) ? "" : "none";
        });
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", applyStudentSearch);
        searchInput.addEventListener("keyup", e => {
            if (e.key === "Enter") applyStudentSearch();
        });
    }
}

function initReportsPage() {
    const courseSelect  = document.getElementById("report-course-filter");
    const sectionSelect = document.getElementById("report-section-filter");
    const startInput    = document.getElementById("report-start-date");
    const endInput      = document.getElementById("report-end-date");
    const applyBtn      = document.getElementById("report-apply-btn");
    const table         = document.getElementById("reports-table");

    if (!courseSelect || !sectionSelect || !startInput || !endInput || !applyBtn || !table) return;

    const tbody = table.querySelector("tbody");
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));

    function applyFilters() {
        const courseVal  = courseSelect.value;
        const sectionVal = sectionSelect.value;
        const startVal   = startInput.value;
        const endVal     = endInput.value;

        const startDate = startVal ? new Date(startVal) : null;
        const endDate   = endVal ? new Date(endVal)   : null;

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const dateStr    = cells[0].textContent.trim();
            const courseStr  = cells[1].textContent.trim();
            const sectionStr = cells[2].textContent.trim();

            let visible = true;

            if (courseVal && courseStr !== courseVal) visible = false;
            if (visible && sectionVal && sectionStr !== sectionVal) visible = false;

            const rowDate = new Date(dateStr);
            if (visible && startDate && rowDate < startDate) visible = false;
            if (visible && endDate && rowDate > endDate) visible = false;

            row.style.display = visible ? "" : "none";
        });
    }

    applyBtn.addEventListener("click", applyFilters);
}
