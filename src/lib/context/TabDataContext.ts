import React from 'react';
import type { PageControle } from '../hook/useTabData';

interface TabDataContextType {
    filterBy: (dataKey: string, filterValue: unknown) => void;
    filterOptions: Map<unknown, Set<unknown>> | null;
    filter: Map<unknown, Set<unknown>>;
    sortBy: (dataKey: string) => void;
    sortByValue: string | null;
    id: string;
    pages: PageControle;
}

const TabDataContext = React.createContext<TabDataContextType | null>(null);

export default TabDataContext;
