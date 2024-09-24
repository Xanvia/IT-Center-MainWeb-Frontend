"use client";

import Staffprofile from "./staff/profile";
import Studentprofile from "./student/profile"


export default function profile() {
  const userType = "Student";//Student

  if (userType == "Student") 
    return <Studentprofile />;
  else
    return <Studentprofile />;


  }
