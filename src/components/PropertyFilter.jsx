import React from "react";

/**
 * PropertyFilter
 * Muestra un <select> con las opciones de filtrado.
 * @param {string[]} options – lista de valores únicos (ej. categorías)
 * @param {string} value – valor seleccionado actualmente
 * @param {function} onChange – callback cuando cambie la selección
 */

const PropertyFilter = ({ options, value, onChange}) => {
    return(
        <select className = "property-filter" value={value} onChange={e => onChange(e.target.value)}>
            <option value = "">Todas</option>
            {options.map(opt => (
                <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
            ))}
        </select>
    );
};


export default PropertyFilter