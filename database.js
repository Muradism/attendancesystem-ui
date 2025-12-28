/* ==========================
   DATABASE LAYER (localStorage)
========================== */

const Database = {
    /* ---------- STUDENTS ---------- */
    getStudents() {
        return JSON.parse(localStorage.getItem("students")) || [];
    },

    addStudent(student) {
        const students = this.getStudents();
        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));
    },

    deleteStudent(studentNo) {
        const students = this.getStudents().filter(
            s => s.no !== studentNo
        );
        localStorage.setItem("students", JSON.stringify(students));
    },

    /* ---------- TEACHERS ---------- */
    getTeachers() {
        return JSON.parse(localStorage.getItem("teachers")) || [];
    },

    addTeacher(teacher) {
        const teachers = this.getTeachers();
        teachers.push(teacher);
        localStorage.setItem("teachers", JSON.stringify(teachers));
    },

    deleteTeacher(id) {
        const teachers = this.getTeachers().filter(
            t => t.id !== id
        );
        localStorage.setItem("teachers", JSON.stringify(teachers));
    },

    /* ---------- COURSES ---------- */
    getCourses() {
        return JSON.parse(localStorage.getItem("courses")) || [];
    },

    addCourse(course) {
        const courses = this.getCourses();
        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));
    },

    deleteCourse(code) {
        const courses = this.getCourses().filter(
            c => c.code !== code
        );
        localStorage.setItem("courses", JSON.stringify(courses));
    },

    /* ---------- ENROLLMENTS ---------- */
    getEnrollments() {
        return JSON.parse(localStorage.getItem("enrollments")) || [];
    },

    addEnrollment(enrollment) {
        const enrollments = this.getEnrollments();
        enrollments.push(enrollment);
        localStorage.setItem("enrollments", JSON.stringify(enrollments));
    },

    deleteEnrollment(index) {
        const enrollments = this.getEnrollments();
        enrollments.splice(index, 1);
        localStorage.setItem("enrollments", JSON.stringify(enrollments));
    }
};
