import type { PropsWithChildren } from 'react';
import useTabData from '../hook/useTabData';
import TabDataContext from '../context/TabDataContext';
import type { RowModelType } from '../type/type';
import DataRow from './DataRow';
import RowLabel from './RowLabel';
import PageControle from './PageControle';

interface TabDataProps<D extends Record<string, string>> extends PropsWithChildren {
    datas: D[];
    id: string;
    maxRow?: number;
    rowModel: RowModelType<D>;
}

export default function TabData<D extends Record<string, string>>({ datas, id, maxRow, rowModel }: TabDataProps<D>) {
    const { datas: dataSet, sortBy, filterOptions, filterBy, filter, pages, dataIds } = useTabData({ datas: datas, isSort: rowModel.sort, isFilter: rowModel.filter, maxRow, keyId: rowModel.idKey });
    return (
        <TabDataContext.Provider value={{ pages, datas: dataSet, filterBy, filterOptions, filter, sortBy, id }}>
            <table>
                <thead>
                    <RowLabel rowModel={rowModel} />
                </thead>
                <tbody>
                    {dataIds.map((dataId) => (
                        <DataRow key={`${id}-row-${dataId}`} id={dataId} rowModel={{ ...rowModel, tabId: id }} />
                    ))}
                </tbody>
                <tfoot>
                    <PageControle colSpan={rowModel.columns.length} />
                </tfoot>
            </table>
        </TabDataContext.Provider>
    );
}
