import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Importa el icono de búsqueda de Lucide
import './MachineSelector.css'; // Aquí cargamos los estilos personalizados

type MachineSelectorProps = {
  machineValue: number | string;
  setMachineValue: React.Dispatch<React.SetStateAction<number | string>>;
};

const MACHINE_VALUES = [
  { name: 'Máquina 1', value: 10 },
  { name: 'Máquina 2', value: 20 },
  { name: 'Máquina 3', value: 30 },
  { name: 'Máquina 4', value: 40 },
  { name: 'Máquina 5', value: 50 },
];

const MachineSelector: React.FC<MachineSelectorProps> = ({ machineValue, setMachineValue }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredMachines, setFilteredMachines] = useState(MACHINE_VALUES);
  const [isOpen, setIsOpen] = useState(false);

  // Filtrar las máquinas basadas en la búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    const searchNormalized = searchValue.replace(/,?\s*/g, '').toLowerCase(); // Normalizamos la búsqueda eliminando comas y espacios
    setFilteredMachines(
      MACHINE_VALUES.filter((machine) =>
        machine.name.toLowerCase().includes(searchNormalized) || 
        machine.value.toString().includes(searchNormalized) // Permite buscar por el valor de la máquina
      )
    );
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="machine-selector-container">
      <label>Valor de Máquina</label>
      <div className="machine-selector">
        {/* Barra de búsqueda con icono */}
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar máquina..."
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={toggleDropdown} // Abre el dropdown al hacer click
            className="search-input"
          />
        </div>
        {/* Lista de opciones filtradas */}
        {isOpen && (
          <ul className="options-list">
            {filteredMachines.map((option) => (
              <li
                key={option.value}
                className="option-item"
                onClick={() => {
                  setMachineValue(option.value);
                  setSearchTerm(option.name); // Set the selected machine's name as the search term
                  setIsOpen(false); // Close the dropdown
                }}
              >
                {option.name} - {option.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MachineSelector;
