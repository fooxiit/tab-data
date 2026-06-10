/// <reference types="vitest/config" />
import { describe, expect, test } from 'vitest';
import { getByText, render } from '@testing-library/react';

import DataRow, { type RowModelTypeExtend } from '../../components/DataRow';
describe('test DataRow component', async () => {
    const data = {
        id: '1',
        name: 'John Doe',
        age: '30',
        city: 'New York',
    };
    const rowModel: RowModelTypeExtend<typeof data> = {
        tabId: 'test-tab',
        columns: [
            { dataKey: 'id', label: 'ID' },
            { dataKey: 'name', label: 'Name' },
            { dataKey: 'city', label: 'City' },
        ],
        idKey: 'id',
    };
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    test('should render correct number of cells', () => {
        const { container } = render(<DataRow id={data.id} data={data} rowModel={rowModel} />, { container: tbody });
        const cells = container.querySelectorAll('td');
        expect(cells.length).equal(rowModel.columns.length);
    });
    test('should render correct cell content', async () => {
        const { container } = render(<DataRow id={data.id} data={data} rowModel={rowModel} />, { container: tbody });
        for (const column of rowModel.columns) {
            const cell = getByText(container, data[column.dataKey]);
            console.log(cell);
            await expect.element(cell).toBeDefined();
        }
    });
    test('should add class if provide', async () => {
        const className = 'testClass';
        const { container } = render(<DataRow id={data.id} data={data} rowModel={rowModel} className={className} />, { container: tbody });
        const trHasClassName = container.querySelector('tr')?.classList.contains(className + '__row');
        const allTd = container.querySelectorAll('td');
        const allTdHasClassName = Array.from(allTd.values()).every((td) => td.classList.contains(className + '__row__cell'));
        expect(trHasClassName).toBeTruthy();
        expect(allTdHasClassName).toBeTruthy();
    });
});
