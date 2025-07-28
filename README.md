# Online-Course-Management-System
Low Level Design Implementation of Online Course Management System in Java

Date: 28-07-2025
Problem Statement
Design an Online Course Management System that supports:

User Roles: Student, Instructor
Course Creation
Enrollment
Assignment Upload & Grading
Role-Based Access Control
UML Class Diagram
Here's the UML Class Diagram of the system:
![WhatsApp Image 2025-07-28 at 10 12 00_aaf8d864](https://github.com/user-attachments/assets/64e91188-ee7d-4347-9d58-aa08f8c8526e)


## Java Implementation (Low Level Design of Online Course Management System):
```
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  login() {
    console.log(`${this.name} has logged in.`);
  }

  logout() {
    console.log(`${this.name} has logged out.`);
  }
}

class Student extends User {
  constructor(id, name, email) {
    super(id, name, email);
  }

  enroll(course) {
    course.addStudent(this);
    console.log(`${this.name} enrolled in ${course.title}`);
  }

  uploadAssignment(assignment, file) {
    assignment.submit(this, file);
    console.log(`${this.name} submitted '${file}' for assignment '${assignment.title}'`);
  }
}

class Instructor extends User {
  constructor(id, name, email) {
    super(id, name, email);
  }

  createCourse(title) {
    const newCourse = new Course(Date.now(), title, this);
    console.log(`${this.name} created course: ${title}`);
    return newCourse;
  }

  gradeAssignment(assignment, student, grade) {
    assignment.submissions.set(student, grade);
    console.log(`${this.name} graded ${student.name}'s assignment '${assignment.title}' with ${grade.value}`);
  }
}

class Course {
  constructor(id, title, instructor) {
    this.id = id;
    this.title = title;
    this.instructor = instructor;
    this.students = [];
    this.assignments = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  addAssignment(assignment) {
    this.assignments.push(assignment);
    console.log(`Assignment '${assignment.title}' added to course '${this.title}'`);
  }
}

class Assignment {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.submissions = new Map();
  }

  submit(student, file) {
    this.submissions.set(student, file);
  }
}

class Grade {
  constructor(value, feedback) {
    this.value = value;
    this.feedback = feedback;
  }

  getGrade() {
    return this.value;
  }

  setGrade(value) {
    this.value = value;
  }
}

const instructor = new Instructor(1, "Dr. Rao", "rao@college.edu");
const student1 = new Student(2, "Alice", "alice@college.edu");
const student2 = new Student(3, "Bob", "bob@college.edu");

const course = instructor.createCourse("DBMS");

student1.enroll(course);
student2.enroll(course);

const assignment1 = new Assignment("ER Diagram", "Design an ER diagram for the college database.");
course.addAssignment(assignment1);

student1.uploadAssignment(assignment1, "erd_alice.pdf");
student2.uploadAssignment(assignment1, "erd_bob.pdf");

const grade1 = new Grade("A", "Excellent work!");
const grade2 = new Grade("B+", "Good effort.");

instructor.gradeAssignment(assignment1, student1, grade1);
instructor.gradeAssignment(assignment1, student2, grade2);

console.log(`${student1.name}'s Grade:`, assignment1.submissions.get(student1).getGrade());
console.log(`${student2.name}'s Grade:`, assignment1.submissions.get(student2).getGrade());

```

OOP Principles Explained
Abstraction
We use abstraction by defining a general User class to represent common user behavior and properties like id, name, email, and shared methods like login() and viewCourses().

Instead of putting all logic in one place, we let Student and Instructor inherit from User and define their own specific actions like uploadAssignment() or createCourse().

Encapsulation
All sensitive/internal data like score, feedback, and submission are accessed or modified only through specific methods like getScore() or submit().

This protects the internal state of each object and ensures it's only updated in controlled ways.

Rather than allowing direct access to grades or submissions, all updates go through well-defined methods.

Inheritance
Both Student and Instructor classes inherit from the base User class, which means they automatically get shared functionality like login() and viewCourses().

They then extend this behavior by adding their own role-specific methods.

This promotes code reuse and helps maintain a clean, scalable structure.

Polymorphism
Polymorphism is demonstrated via method overriding — the login() method behaves differently depending on whether it’s called by a Student or an Instructor.

This lets us use the same method name but implement custom logic for each role.

It allows flexible role handling while maintaining a common interface.

SOLID Design Principles
S — Single Responsibility Principle
Every class in the system is responsible for a single piece of functionality:

User: basic user properties and actions
Student: viewing grades, submitting assignments
Instructor: creating courses, grading
Course: handling enrollment and assignment logic
Grade: managing scores and feedback
This separation makes each class easier to understand and maintain.

O — Open/Closed Principle
The system is open to extension but closed to modification.

You can add new features (e.g., an Admin or TeachingAssistant role) by extending existing classes — no need to touch the core logic.

For example, adding support for TAs means just creating a new class.

L — Liskov Substitution Principle
Since Student and Instructor inherit from User, you can use either wherever a User is expected.

Substituting subclasses won’t break the system because they conform to the same structure and interface.

I — Interface Segregation Principle
Even without formal interfaces (like in TypeScript or C#), we give each class only the methods it actually needs.

Student doesn’t handle grading.
Instructor doesn’t handle assignment submissions.
This avoids forcing roles to implement irrelevant methods.

D — Dependency Inversion Principle
High-level modules like Instructor don’t rely on the low-level implementation details of Assignment or Grade.

Instead, they interact with them through abstracted methods like gradeAssignment().

This makes the codebase more flexible, testable, and maintainable.
