import { useContext } from 'react';
import TabDataContext from '../context/TabDataContext';

const useTabDataContext = () => {
    const context = useContext(TabDataContext);
    if (!context) throw new Error('useTabDataContext must be used within a TabDataProvider');
    return context;
};

export default useTabDataContext;
