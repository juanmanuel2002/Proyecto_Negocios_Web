import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import '../styles/Tienda.css';

const FilterDropdown = ({ options, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Mide la posición cuando vas a abrir
  const handleToggle = () => {
    if (!open && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
    }
    setOpen(o => !o);
  };

  // Cierra al clicar fuera de botón Y menú
  useEffect(() => {
    const handler = e => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Alterna valores en el array
  const toggleValue = value =>
    selected.includes(value)
      ? onChange(selected.filter(v => v !== value))
      : onChange([...selected, value]);

  // Orden alfabético
  const sorted = [...options].sort((a, b) => a.localeCompare(b));

  // El dropdown que montamos en <body>
  const dropdown = (
    <ul
      ref={dropdownRef}
      className="filter-dropdown-list"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999
      }}
    >
      {sorted.map(opt => (
        <li key={opt}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggleValue(opt)}
              className="mr-2"
            />
            <span className="capitalize">{opt}</span>
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="filter-dropdown-wrapper" ref={wrapperRef}>
        <button
          type="button"
          onClick={handleToggle}
          className="filter-dropdown-button"
          aria-label="Filtrar productos"
        >
          <FilterAltIcon fontSize="medium" />
        </button>
      </div>
      {open && createPortal(dropdown, document.body)}
    </>
  );
};

export default FilterDropdown;
