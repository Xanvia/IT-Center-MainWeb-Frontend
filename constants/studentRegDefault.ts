export const DefaultStudentRegValues = {
  personalDetails: {
    title: "",
    fullName: "",
    nameWithInitials: "",
    nationalIdCardNo: "",
    phoneNumber: "",
    postalAddress: "",
    photo: null,
  },
  educationalQualifications: {
    olevel: {
      english: "",
      mathematics: "",
      science: "",
    },
    alevel: [
      { subject: "", grade: "" },
      { subject: "", grade: "" },
      { subject: "", grade: "" },
      { subject: "", grade: "" },
    ],
  },
  higherEducationalQualifications: [
    { qualification: "", dateAwarded: "", institute: "" },
  ],
  otherQualifications: "",
  employmentDetails: {
    institute: "",
    designation: "",
    officeAddress: "",
    officeTelephone: "",
  },
};
