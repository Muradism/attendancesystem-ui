document.addEventListener("DOMContentLoaded", () => {

    /* ================= STUDENTS ================= */
    const addStudentBtn = document.getElementById("add-student-btn");
    if (addStudentBtn) {
        renderStudents();

        addStudentBtn.addEventListener("click", () => {
            const no = document.getElementById("student-no").value.trim();
            const name = document.getElementById("student-name").value.trim();
            const program = document.getElementById("student-program").value.trim();

            if (!no || !name) {
                alert("Student No and Name are required");
                return;
            }

            Database.addStudent({ no, name, program });
            renderStudents();

            document.getElementById("student-no").value = "";
            document.getElementById("student-name").value = "";
            document.getElementById("student-program").value = "";
        });
    }

    function renderStudents() {
        const tbody = document.getElementById("students-table-body");
        if (!tbody) return;

        tbody.innerHTML = "";
        Database.getStudents().forEach(student => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${student.no}</td>
                <td>${student.name}</td>
                <td>${student.program || "-"}</td>
                <td>
                    <button onclick="deleteStudent('${student.no}')">
                        Delete
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.deleteStudent = (no) => {
        Database.deleteStudent(no);
        renderStudents();
    };

    /* ================= TEACHERS ================= */
    const addTeacherBtn = document.getElementById("add-teacher-btn");
    if (addTeacherBtn) {
        renderTeachers();

        addTeacherBtn.addEventListener("click", () => {
            const id = document.getElementById("teacher-id").value.trim();
            const name = document.getElementById("teacher-name").value.trim();
            const dept = document.getElementById("teacher-dept").value.trim();
            const email = document.getElementById("teacher-email").value.trim();

            if (!id || !name) {
                alert("Teacher ID and Name are required");
                return;
            }

            Database.addTeacher({ id, name, dept, email });
            renderTeachers();
        });
    }

    function renderTeachers() {
        const tbody = document.getElementById("teachers-table-body");
        if (!tbody) return;

        tbody.innerHTML = "";
        Database.getTeachers().forEach(t => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${t.id}</td>
                <td>${t.name}</td>
                <td>${t.dept || "-"}</td>
                <td>${t.email || "-"}</td>
                <td>
                    <button onclick="deleteTeacher('${t.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.deleteTeacher = (id) => {
        Database.deleteTeacher(id);
        renderTeachers();
    };

    /* ================= COURSES ================= */
    const addCourseBtn = document.getElementById("add-course-btn");
    if (addCourseBtn) {
        renderCourses();

        addCourseBtn.addEventListener("click", () => {
            const code = document.getElementById("course-code").value.trim();
            const name = document.getElementById("course-name").value.trim();
            const credits = document.getElementById("course-credits").value.trim();

            if (!code || !name) {
                alert("Course code and name required");
                return;
            }

            Database.addCourse({ code, name, credits });
            renderCourses();
        });
    }

    function renderCourses() {
        const tbody = document.getElementById("courses-table-body");
        if (!tbody) return;

        tbody.innerHTML = "";
        Database.getCourses().forEach(c => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${c.code}</td>
                <td>${c.name}</td>
                <td>${c.credits || "-"}</td>
                <td>
                    <button onclick="deleteCourse('${c.code}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.deleteCourse = (code) => {
        Database.deleteCourse(code);
        renderCourses();
    };

    /* ================= ASSIGN COURSES ================= */
    const assignBtn = document.getElementById("assign-course-btn");
    if (assignBtn) {
        fillAssignSelects();
        renderEnrollments();

        assignBtn.addEventListener("click", () => {
            const student = document.getElementById("assign-student").value;
            const course = document.getElementById("assign-course").value;
            const semester = document.getElementById("assign-semester").value;

            if (!student || !course) {
                alert("Select student and course");
                return;
            }

            Database.addEnrollment({ student, course, semester });
            renderEnrollments();
        });
    }

    function fillAssignSelects() {
        const studentSel = document.getElementById("assign-student");
        const courseSel = document.getElementById("assign-course");

        if (!studentSel || !courseSel) return;

        studentSel.innerHTML = "";
        Database.getStudents().forEach(s => {
            studentSel.innerHTML += `<option value="${s.no}">${s.no} - ${s.name}</option>`;
        });

        courseSel.innerHTML = "";
        Database.getCourses().forEach(c => {
            courseSel.innerHTML += `<option value="${c.code}">${c.code} - ${c.name}</option>`;
        });
    }

    function renderEnrollments() {
        const tbody = document.getElementById("assignments-table-body");
        if (!tbody) return;

        tbody.innerHTML = "";
        Database.getEnrollments().forEach((e, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${e.student}</td>
                <td>${e.course}</td>
                <td>${e.semester || "-"}</td>
                <td>
                    <button onclick="deleteEnrollment(${i})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.deleteEnrollment = (i) => {
        Database.deleteEnrollment(i);
        renderEnrollments();
    };
});
