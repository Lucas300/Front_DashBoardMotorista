import { ChevronDown } from 'lucide-react';

interface SortOption {
    value: string;
    label: string;
}

interface FilterDropdownProps {
    options: SortOption[];
    selectedOption: string;
    onOptionChange: (value: string) => void;
    label?: string;
}

const FilterDropdown = ({
    options,
    selectedOption,
    onOptionChange,
    label = "Ordenar por"
}: FilterDropdownProps) => {
    return (
        <div className="status-filter">
            <select
                className="filter-select"
                value={selectedOption}
                onChange={(e) => onOptionChange(e.target.value)}
            >
                <option value="" disabled>{label}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDown size={14} className="filter-chevron" />
        </div>
    );
};

export default FilterDropdown;
