import React from 'react';

interface TextInputProps {
    label: string;
    className?: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
  }

  const TextInput: React.FC<TextInputProps> = ({ label, className, type, onChange, value}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <div className={`${className} flex flex-col items-center mb-4`}>
          <p className="font-medium text-left w-full">{label}</p>
          <input className="w-full rounded-lg px-2" type={type} value={value} onChange={handleChange}/>
      </div>
    );
};

export default TextInput;
