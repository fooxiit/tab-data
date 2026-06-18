import React from 'react';
import type { PageControl } from '../hook/useTabData';
import type { SortBy } from '../hook/useSelectSort';

export interface TabDataContextType {
    filterBy: (dataKey: string, filterValue: unknown) => void;
    filterOptions: Map<unknown, Set<unknown>> | null;
    filter: Map<unknown, Set<unknown>>;
    sortBy: (dataKey: string) => void;
    sortByValue: SortBy<Record<string, string>> | null;
    id: string;
    pages: PageControl;
}

const TabDataContext = React.createContext<TabDataContextType | null>(null);

export default TabDataContext;
