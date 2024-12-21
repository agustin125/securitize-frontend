import React from 'react';
import '../../styles/Input.css';

interface InputProps {
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
}

export const Input: React.FC<InputProps> = ({ label, type, value, onChange, placeholder, name }) => (
  <div className="input-container">
    {label && <label>{label}</label>}
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);
