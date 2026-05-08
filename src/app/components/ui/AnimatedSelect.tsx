import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './AnimatedSelect.css';

interface AnimatedSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export function AnimatedSelect({ value, onChange, options, placeholder = "Select an option", required = false }: AnimatedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, options.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        onChange(options[selectedIndex].value);
        setIsOpen(false);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, options, onChange]);

  useEffect(() => {
    if (!isOpen || selectedIndex < 0 || !listRef.current) return;

    const selectedItem = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Hidden native select for form validation
  return (
    <div className="animated-select-container" ref={containerRef}>
      {required && (
        <select
          tabIndex={-1}
          style={{ opacity: 0, position: 'absolute', width: 0, height: 0 }}
          value={value}
          onChange={() => {}}
          required={required}
          aria-hidden
        >
          <option value="" />
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      )}
      <button
        type="button"
        className={`animated-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'selected' : 'placeholder'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`chevron ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="animated-select-dropdown animated-select-dropdown--open">
          <div className="animated-select-list" ref={listRef}>
            {options.map((option, index) => (
              <div
                key={option.value}
                data-index={index}
                className={`animated-select-option ${value === option.value ? 'selected' : ''} ${selectedIndex === index ? 'highlighted' : ''}`}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setSelectedIndex(index)}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
