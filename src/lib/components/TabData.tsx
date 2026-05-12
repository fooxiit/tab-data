import type { PropsWithChildren } from 'react';
import useTabData from '../hook/useTabData';
import TabDataContext from '../context/TabDataContext';
import type { RowModelType } from '../type/type';
import DataRow from './DataRow';
import RowLabel from './RowLabel';
import PageControle from './PageControle';
import '../style/data-table.css';
import '../style/index.css';

interface TabDataProps<D extends Record<string, string>> extends PropsWithChildren {
    datas: D[];
    id: string;
    maxRow?: number;
    rowModel: RowModelType<D>;
    className?: string;
}

export default function TabData<D extends Record<string, string>>({ datas, id, maxRow, rowModel, className }: TabDataProps<D>) {
    const {
        datas: dataSet,
        sortBy,
        sortByValue,
        filterOptions,
        filterBy,
        filter,
        pages,
        dataIds,
    } = useTabData({ datas: datas, isSort: rowModel.sort, isFilter: rowModel.filter, maxRow, keyId: rowModel.idKey });
    return (
        <TabDataContext.Provider value={{ pages, datas: dataSet, filterBy, filterOptions, filter, sortBy, sortByValue: sortByValue as string | null, id }}>
            <table className={className ? className : 'data-table'}>
                <thead className={className ? `${className}__thead` : 'data-table__thead'}>
                    <RowLabel rowModel={rowModel} className={className} />
                </thead>
                <tbody className={className ? `${className}__tbody` : 'data-table__tbody'}>
                    {dataIds.map((dataId) => (
                        <DataRow key={`${id}-row-${dataId}`} id={dataId} rowModel={{ ...rowModel, tabId: id }} className={className} />
                    ))}
                </tbody>
                <tfoot className={className ? `${className}__tfoot` : 'data-table__tfoot'}>
                    <PageControle colSpan={rowModel.columns.length} className={className} />
                </tfoot>
            </table>
        </TabDataContext.Provider>
    );
}
