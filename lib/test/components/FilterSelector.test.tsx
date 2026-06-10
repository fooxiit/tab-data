import { cleanup, render } from '@testing-library/react';
import FilterSelector from '../../components/FilterSelector';
import { expect, vi, describe, test, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';

describe('FilterSelector test', async () => {
    const mockOption = [['1', false] as [string, boolean], ['2', true] as [string, boolean], ['3', false] as [string, boolean], ['4', false] as [string, boolean], ['5', true] as [string, boolean]];
    const mockOnFilterSelect = vi.fn(() => {});
    afterEach(() => {
        cleanup();
        mockOnFilterSelect.mockClear();
    });
    test('should render colapse filter list', () => {
        const { container } = render(<FilterSelector onFilterSelect={mockOnFilterSelect} option={mockOption} />);
        const filter = container.querySelector('.data-table__label__filter');
        const htmlOption = container.querySelector('.data-table__label__filter__dropdown');
        expect(filter).not.toBeNull();
        expect(htmlOption).toBeNull();
    });
    test('should expand option on click filterSelect and render all option', async () => {
        const { container } = render(<FilterSelector onFilterSelect={mockOnFilterSelect} option={mockOption} />);
        const filter = container.querySelector('.data-table__label__filter');
        if (!filter) return;
        await userEvent.click(filter);
        const searchBar = container.querySelector('.data-table__label__filter__search')?.querySelector('input');
        const htmlOption = container.querySelector('.data-table__label__filter__dropdown');
        const options = container.querySelectorAll('.data-table__label__filter__option');
        expect(htmlOption).not.toBeNull();
        expect(options.length).toBe(mockOption.length);
        expect(searchBar).not.toBeNull();
        options.forEach((option, index) => {
            const check = option.querySelector('i') === null ? false : true;
            const optionValue = option.getAttribute('data-value');
            expect(optionValue).toBe(mockOption[index][0]);
            expect(check).toBe(mockOption[index][1]);
        });
    });
    test('should call FilterSelect on click option', async () => {
        const { container } = render(<FilterSelector onFilterSelect={mockOnFilterSelect} option={mockOption} />);
        const filter = container.querySelector('.data-table__label__filter');
        if (!filter) return;
        await userEvent.click(filter);
        const option = container.querySelector('.data-table__label__filter__option');
        if (!option) throw new Error('option element was not fond');
        await userEvent.click(option);
        expect(mockOnFilterSelect).toHaveBeenCalled();
    });
});
