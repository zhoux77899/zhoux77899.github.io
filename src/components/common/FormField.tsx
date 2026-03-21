import { motion } from 'framer-motion';
import { useState } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  rows = 5,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles = {
    backgroundColor: 'var(--field-background)',
    borderColor: isFocused ? 'var(--accent)' : 'var(--field-border)',
    color: 'var(--field-foreground)',
  };

  const commonProps = {
    name,
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    required,
    className:
      'w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none',
    style: inputStyles,
  };

  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: 'var(--foreground)' }}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <motion.textarea
          {...commonProps}
          rows={rows}
          whileFocus={{ scale: 1.01 }}
        />
      ) : (
        <motion.input
          {...commonProps}
          type={type}
          whileFocus={{ scale: 1.01 }}
        />
      )}
    </div>
  );
}
