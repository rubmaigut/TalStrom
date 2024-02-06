import React, { useState } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';

interface Props {
  selectedTechnologies: string[];
  onChange: (selected: string[]) => void;
}

interface Option {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const SelectTechnologies: React.FC<Props> = ({
  selectedTechnologies,
  onChange,
}) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const options: readonly Option[] = [
    { value: '', label: 'Choose your Programming Languages', isDisabled: true },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cplusplus', label: 'C++' },
    // { value: 'C', label: 'C' },
    // { value: 'php', label: 'PHP' },
    // { value: 'swift', label: 'Swift' },
    // { value: 'ruby', label: 'Ruby' },
    // { value: 'typescript', label: 'TypeScript' },
    // { value: 'go', label: 'Go' },
    // { value: 'kotlin', label: 'Kotlin' },
    // { value: 'rust', label: 'Rust' },
    // { value: 'dart', label: 'Dart' },
    // { value: 'r', label: 'R' },
    // { value: 'scala', label: 'Scala' },
    // { value: 'perl', label: 'Perl' },
    // { value: 'lua', label: 'Lua' },
    // { value: 'haskell', label: 'Haskell' },
    // { value: 'elixir', label: 'Elixir' },
    // { value: 'react', label: 'React' },
    // { value: 'angular', label: 'Angular' },
    // { value: 'vue', label: 'Vue.js' },
    // { value: 'express', label: 'Express.js' },
    // { value: 'django', label: 'Django' },
    // { value: 'flask', label: 'Flask' },
    // { value: 'spring', label: 'Spring' },
    // { value: 'ruby_on_rails', label: 'Ruby on Rails' },
    // { value: 'laravel', label: 'Laravel' },
    // { value: 'asp_net_core', label: 'ASP.NET Core' },
    // { value: 'symfony', label: 'Symfony' },
    // { value: 'react_native', label: 'React Native' },
    // { value: 'flutter', label: 'Flutter' },
    // { value: 'svelte', label: 'Svelte' },
    // { value: 'next_js', label: 'Next.js' },
    // { value: 'nestjs', label: 'NestJS' },
    // { value: 'fastify', label: 'Fastify' },
    // { value: 'jquery', label: 'jQuery' },
    // { value: 'ember', label: 'Ember.js' },
    // { value: 'backbone', label: 'Backbone.js' },
  ];

  const handleSelectChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => {
    const values = newValue ? newValue.map((option) => option.value) : [];
    onChange(values);
  };

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options.find((option) =>
          selectedTechnologies.includes(option.value),
        )}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isMulti
        options={options}
        onChange={handleSelectChange}
      />
      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'normal',
          marginTop: '1em',
        }}
      ></div>
    </>
  );
};
