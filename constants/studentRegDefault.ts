export const DefaultStudentRegValues = {
  personalDetails: {
    title: "",
    fullName: "",
    nameWithInitials: "",
    dateOfBirth: "",
    nationalIdCardNo: "",
    phoneNumber: "",
    address: "",
  },
  educationalQualifications: {
    olevel: {
      englishOL: "",
      mathematicsOL: "",
      scienceOL: "",
    },
    alevel: [
      { subject: "", grade: "" },
      { subject: "", grade: "" },
      { subject: "", grade: "" },
      { subject: "", grade: "" },
    ],
  },
  higherEducationalQualifications: [
    { FOQualification: "", date: "", institute: "" },
  ],
  otherQualifications: "",
  employmentDetails: {
    institute: "",
    designation: "",
    officeAddress: "",
    officePhone: "",
  },
};
