import { Search, ChevronDown } from 'lucide-react';

interface FilterOption {
    value: string;
    label: string;
}

interface TableSearchFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    placeholder?: string;
    options?: FilterOption[];
}

const defaultOptions: FilterOption[] = [
    { value: 'all', label: 'Todos' },
    { value: 'exceededKm', label: 'Excedeu KM' },
    { value: 'speeding', label: 'Velocidade' },
    { value: 'route_deviation', label: 'Desvio' },
    { value: 'delayed', label: 'Atrasado' },
];

const TableSearchFilter = ({
    searchQuery,
    onSearchChange,
    selectedFilter,
    onFilterChange,
    placeholder = "Buscar...",
    options = defaultOptions
}: TableSearchFilterProps) => {
    return (
        <div className="table-filter-system">
            <div className="search-bar">
                <Search size={16} className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="status-filter">
                <select
                    className="filter-select"
                    value={selectedFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown size={14} className="filter-chevron" />
            </div>
        </div>
    );
};

export default TableSearchFilter;
