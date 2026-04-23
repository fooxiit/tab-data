import React from 'react';

const TabDataContext = React.createContext<{ datas: Map<unknown, Record<string, unknown>> } | null>(null);

export default TabDataContext;
