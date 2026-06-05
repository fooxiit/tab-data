import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import usePageSelector from '../../hook/usePageSelector';
import { act } from 'react';

describe('test usePageSelector hook', () => {
    test('should return initial page value', () => {
        const { result } = renderHook(() => usePageSelector(100, 10, 2));
        expect(result.current.currentPage).toBe(2);
    });
    test('should return maxPage value', () => {
        const { result } = renderHook(() => usePageSelector(100, 10));
        expect(result.current.maxPage).toBe(10);
    });
    test('should return maxPage value when maxRow is not provided', () => {
        const { result } = renderHook(() => usePageSelector(100));
        expect(result.current.maxPage).toBe(1);
    });
    test('should set page to specific page', () => {
        const { result } = renderHook(() => usePageSelector(100, 10, 0));
        act(() => {
            result.current.controle.set(5);
        });
        expect(result.current.currentPage).toBe(5);
    });
    test('should go to next page', () => {
        const { result } = renderHook(() => usePageSelector(100, 10, 0));
        act(() => {
            result.current.controle.next();
        });
        expect(result.current.currentPage).toBe(1);
    });
    test('should go to previous page', () => {
        const { result } = renderHook(() => usePageSelector(100, 10, 2));
        act(() => {
            result.current.controle.prev();
        });
        expect(result.current.currentPage).toBe(1);
    });
    test('should not go to next page if current page is last page', () => {
        const { result } = renderHook(() => usePageSelector(100, 10, 9));
        act(() => {
            result.current.controle.next();
        });
        expect(result.current.currentPage).toBe(9);
    });
    test('should not go to previous page if current page is first page', () => {
        const { result } = renderHook(() => usePageSelector(100, 10, 0));
        act(() => {
            result.current.controle.prev();
        });
        expect(result.current.currentPage).toBe(0);
    });
});
