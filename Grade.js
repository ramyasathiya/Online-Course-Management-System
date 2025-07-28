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
