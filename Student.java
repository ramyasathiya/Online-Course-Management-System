class Student extends User {
  constructor(id, name, email) {
    super(id, name, email);
  }

  enroll(course) {
    course.addStudent(this);
  }

  uploadAssignment(assignment, file) {
    assignment.submit(this, file);
  }
}
