import React, { useState } from "react";
import Select from "react-select";

interface Option {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

interface SelectComponentProps {
  onRoleChange: (role: string) => void;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  onRoleChange,
}) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const options: readonly Option[] = [
    { value: "", label: "Select Role", isDisabled: true },
    { value: "admin", label: "Admin" },
    { value: "customer", label: "Customer" },
    { value: "developer", label: "Developer" },
  ];

  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onRoleChange(selectedOption.value);
    }
  };

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        name="role"
        options={options}
        onChange={(option) => handleChange(option as Option)}
      />
      <div
        style={{
          color: "hsl(0, 0%, 40%)",
          display: "inline-block",
          fontSize: 12,
          fontStyle: "normal",
          marginTop: "1em",
        }}
      ></div>
    </>
  );
};
export default SelectComponent;
