import React, { useState } from 'react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Disclosure: React.FC<DisclosureProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '6px', marginBottom: '8px' }}>
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '12px',
            background: '#1e293b',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {title} {isOpen ? '▲' : '▼'}
        </button>
      </h3>
      {isOpen && (
        <div style={{ padding: '12px', background: '#0f172a', color: '#fff' }}>
          {children}
        </div>
      )}
    </div>
  );
};