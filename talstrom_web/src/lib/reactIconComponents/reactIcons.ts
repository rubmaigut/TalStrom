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
    { language: "dotnet", reactIcon: "SiDotnet", color: "#2faeed" },
    { language: "swift", reactIcon: "FaSwift", color: "#f5bc42" },
    { language: "ruby", reactIcon: "SiRuby", color: "#e03a40" },
    { language: "typescript", reactIcon: "SiTypescript", color: "#2faeed" },
    { language: "kotlin", reactIcon: "SiKotlin", color: "#2faeed" },
    { language: "rust", reactIcon: "FaRust", color: "#ab3c1a" },
    { language: "react", reactIcon: "FaReact", color: "#32cee3" },
    { language: "angular", reactIcon: "FaAngular", color: "#e33232" },
    { language: "next_js", reactIcon: "SiNextdotjs", color: "#000" },
    { language: "vue", reactIcon: "FaVuejs", color: "#71d42f" },
  ];

  export default techIcons;
