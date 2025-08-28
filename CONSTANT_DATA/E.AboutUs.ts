export type aboutUs = {
  id: string;
  description: string;
};

export const aboutus: aboutUs[] = [
  {
    description: "Empowering growth through technology solutions",
    id: "1",
  },
  {
    description: "Expert-led IT courses and guidance",
    id: "2",
  },
  {
    description: "Advanced labs for practical learning",
    id: "3",
  },
  {
    description: "Innovating digital education platforms",
    id: "4",
  },
];

export const pastDirectors = [
  {
    id: 1,
    imgSrc: "/users/directors/dir1.jpg",
    name: "Prof. K. M. Liyanage",
    edu: "B.Sc(Pera), MSc(Japan), PhD(Japan)",
    department: "Department of Electrical and Electronic Engineering, Faculty of Engineering"
    
  },
  {
    id: 2,
    imgSrc: "/users/directors/dir2.jpg",
    name: "Prof. P. M. K. Alahakoon",
    edu: "B.Sc(Pera), MSc(Virginia,USA), PhD(Missouri,USA)",
    department: "Department of Agriculture Engineering, Faculty of Agricultureture"
    
    
  },
  {
    id: 3,
    imgSrc: "/users/directors/dir3.png",
    name: "Prof. S. R. Kodithuwakku",
    edu: "B.Sc(Pera), MSc(Thailand), PhD(Australia)",
    department: "Department of Statistics and Computer Science, Faculty of Science"
    
  },
  {
    id: 4,
    imgSrc: "/users/directors/dir4.jpg",
    name: "Dr. J. V. Wijayakulasooriya",
    edu: "B.Sc(Pera), PhD(UK)",
    department: "Department of Electrical and Electronic Engineering, Faculty of Engineering"
   
  },
];
