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
    { language: "python", reactIcon: "SiPython", color: "#30cf1b" },
    { language: "javascript", reactIcon: "SiJavascript", color: "#f5d442" },
    { language: "java", reactIcon: "FaJava", color: "pink" },
    { language: "csharp", reactIcon: "SiCsharp", color: "#1b81cf" },
    { language: "cplusplus", reactIcon: "SiCplusplus", color: "#1b81cf" },
    { language: "php", reactIcon: "SiPhp", color: "#2faeed" },
  ];

  export default techIcons;