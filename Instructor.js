class Instructor extends User {
  constructor(id, name, email) {
    super(id, name, email);
  }

  createCourse(title) {
    return new Course(Date.now(), title, this);
  }

  gradeAssignment(assignment, student, grade) {
    assignment.submissions.set(student, grade);
  }
}
