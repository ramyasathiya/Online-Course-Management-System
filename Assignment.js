class Assignment {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.submissions = new Map(); // Map<Student, string>
  }

  submit(student, file) {
    this.submissions.set(student, file);
  }
}
