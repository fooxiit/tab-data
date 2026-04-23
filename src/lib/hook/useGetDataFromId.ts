import useTabDataContext from './useTabDataContext';

function useGetDataFromId(id: unknown) {
    const { datas } = useTabDataContext();
    const data = datas.get(id);
    if (data) return data;
    throw new Error('data not found');
}

export default useGetDataFromId;
