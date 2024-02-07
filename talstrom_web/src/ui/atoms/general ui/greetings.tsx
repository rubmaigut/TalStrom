import React from "react";

const GreetingModal: React.FC = () => {
  const hours = new Date().getHours();

  let greeting;
  if (hours < 12) {
    greeting = "Good Morning 🌞";
  } else if (hours >= 12 && hours <= 17) {
    greeting = "Good Afternoon ☕️";
  } else {
    greeting = "Good Evening 😊";
  }

  return <h2 className="text-xl text-gray-600 font-bold py-2">{greeting}</h2>;
};

export default GreetingModal;