import React, { useState } from 'react';
import { isLoggedIn } from '../../../utils/localStorage';
import { useAppDispatch, useSelectorMy, RootState } from '../../../components/store/store'; 
import { fetchAllEvents, fetchMyEvents, fetchEventsBetweenDates, clearEvents } from '../../../components/store/events/slices'; 
import styles from './filters.module.scss';

type FilterOption = 'My' | 'Dates' | 'All';

const DropdownFilter: React.FC = () => {
  const dispatch = useAppDispatch(); 
    const { data: dataEvents, loading: loadingEvents, error: errorEvents } = useSelectorMy((state: RootState) => state.events);
const { data: dataProfile, loading: loadingProfile, error: errorProfile } = useSelectorMy((state: RootState) => state.profile); 
 
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('All');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  
  const isUserLoggedIn = isLoggedIn();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as FilterOption);
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
    dispatch(clearEvents());
    
    if (selectedFilter === 'All') {
      dispatch(fetchAllEvents());
    } else if (selectedFilter === 'My') {
      dispatch(fetchMyEvents());

    } else if (selectedFilter === 'Dates') {
      dispatch(fetchEventsBetweenDates({ dateStart: dateStart, dateEnd: dateEnd }));
    }

    if(errorEvents){
      console.log(errorEvents);
    }
    
   };

   return (
     <div className={styles.container}>
       <label htmlFor="filter" className={styles.label}>Фильтр:</label>
       <select id="filter" value={selectedFilter} onChange={handleFilterChange} className={styles.select}>
         {isUserLoggedIn && <option value="My">Мои</option>}
         <option value="Dates">По датам</option>
         <option value="All">Все</option>
       </select>

       {selectedFilter === 'Dates' && (
         <div>
           <label htmlFor="dateStart" className={styles.label}>Дата начала:</label>
           <input
             type="date"
             id="dateStart"
             value={dateStart}
             onChange={handleDateStartChange}
             className={styles.input}
           />

           <label htmlFor="dateEnd" className={styles.label}>Дата конца:</label>
           <input
             type="date"
             id="dateEnd"
             value={dateEnd}
             onChange={handleDateEndChange}
             className={styles.input}
           />
         </div>
       )}
       <button onClick={handleSearch} className={styles.button}>
         Искать
       </button>
       {errorEvents && (
         <div style={{ color: 'red', marginTop: '10px' }}>
           {errorEvents}
         </div>
       )}
     </div>
   );
};

export default DropdownFilter;
