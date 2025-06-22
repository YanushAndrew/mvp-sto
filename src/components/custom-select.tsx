import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean; // Add disabled property
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void; // New prop
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, className, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(placeholder || 'Select an option');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    setSelectedLabel(selectedOption ? selectedOption.label : (placeholder || 'Select an option'));
  }, [value, options, placeholder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onOpenChange) {
          onOpenChange(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOpenChange]);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onOpenChange) {
      onOpenChange(newState);
    }
  };

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      ref={selectRef}
      data-locator="D:\!mvp-sto\proj\src\components\custom-select.tsx:div:64:8"
    >
      <button
        type="button"
        className="flex justify-between items-center w-full px-3 py-2 border border-[var(--color-default-border)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)] sm:text-sm bg-[var(--color-content1)] text-[var(--color-foreground)] cursor-pointer"
        onClick={toggleOpen}
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto transition-all duration-300 ease-in-out transform origin-top"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'scaleY(1)' : 'scaleY(0.95)',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer ${option.disabled ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-gray-700 text-gray-100'}`}
              onClick={() => !option.disabled && handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
