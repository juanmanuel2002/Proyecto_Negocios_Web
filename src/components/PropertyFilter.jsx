import React from "react";

/**
 * PropertyFilter
 * Muestra un <select> con las opciones de filtrado.
 * @param {string[]} options – lista de valores únicos (ej. categorías)
 * @param {string[]} value – valor seleccionado actualmente
 * @param {(cats: string[])=>void} onChange – callback cuando cambie la selección
 */

const PropertyFilter = ({ options, value, onChange}) => {
    const handleChange = e => {
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        onChange(selected);
    }


    return(
        <select 
        multiple
        className = "property-filter"
        value={value}
        onChange={handleChange}
        >
            {options.map(opt => (
                <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
            ))}
        </select>
    );
};


export default PropertyFilter