export interface RowModelType<D> {
    columns: { dataKey: keyof D; label: string }[];
    idKey: keyof D;
    sort?: boolean;
    filter?: boolean;
}
