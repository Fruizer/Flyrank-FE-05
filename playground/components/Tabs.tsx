import React, { useState, useRef } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultTabId }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId || items[0]?.id || '');
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (event.key === 'ArrowRight') {
      newIndex = (index + 1) % items.length;
    } else if (event.key === 'ArrowLeft') {
      newIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === 'Home') {
      newIndex = 0;
    } else if (event.key === 'End') {
      newIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = items[newIndex];
    setActiveTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Playground Tabs" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #334155' }}>
        {items.map((item, index) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => (tabRefs.current[item.id] = el)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                padding: '8px 16px',
                background: isActive ? '#3b82f6' : 'transparent',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <div
            key={item.id}
            id={`panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            hidden={!isActive}
            tabIndex={0}
            style={{ padding: '16px', color: '#fff' }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};