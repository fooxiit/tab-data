import { useContext } from 'react';
import TabDataContext from '../context/TabDataContext';
//Gère l’utilisation du context en s’assurant qu'il soit appelé avec le bon provider
const useTabDataContext = () => {
    const context = useContext(TabDataContext);
    if (!context) throw new Error('useTabDataContext must be used within a TabDataProvider');
    return context;
};

export default useTabDataContext;
