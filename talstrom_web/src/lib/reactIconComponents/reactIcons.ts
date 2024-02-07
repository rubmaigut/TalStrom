type TechIcon = {
    language: string;
    reactIcon: string;
    color: string;
  };

  const techIcons: readonly TechIcon[] = [
    {
      language: "",
      reactIcon: "Choose your Programming Languages",
      color: "pink",
    },
    { language: "python", reactIcon: "python", color: "pink" },
    { language: "javascript", reactIcon: "SiJavascript", color: "yellow" },
    { language: "java", reactIcon: "FaJava", color: "pink" },
    { language: "csharp", reactIcon: "SiCsharp", color: "blue" },
    { language: "cplusplus", reactIcon: "SiCplusplus", color: "pink" },
  ];

  export default techIcons;