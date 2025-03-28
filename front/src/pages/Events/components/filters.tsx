import React, { useState } from 'react';
import {isLoggedIn} from '../../../utils/localStorage';

type FilterOption = 'My' | 'Dates' | 'All';

const DropdownFilter: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>('All');
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');
    const isUserLoggedIn = isLoggedIn();
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(event.target.value as FilterOption);
        // Сброс значений дат, когда фильтр меняется
        setDateStart('');
        setDateEnd('');
    };

    const handleDateStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateStart(event.target.value);
    };

    const handleDateEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateEnd(event.target.value);
    };
    const handleSearch = () => {
            console.log('SEARCH');
    };
    return (
        <div>
            <label htmlFor="filter">Choose a filter:</label>
            <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
            {isUserLoggedIn && <option value="My">My</option>} {}
                <option value="Dates">Dates</option>
                <option value="All">All</option>
            </select>

            {selectedFilter === 'Dates' && (
                <div>
                    <label htmlFor="dateStart">Start Date:</label>
                    <input
                        type="date"
                        id="dateStart"
                        value={dateStart}
                        onChange={handleDateStartChange}
                    />

                    <label htmlFor="dateEnd">End Date:</label>
                    <input
                        type="date"
                        id="dateEnd"
                        value={dateEnd}
                        onChange={handleDateEndChange}
                    />
                </div>
            )}
            <button
                className={``}
                onClick={handleSearch}
              >
                Search
              </button>
        </div>
    );
};

export default DropdownFilter;