import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useExpend from '../../hook/useExpend';

describe('useExpend test', () => {
    test('should initialize value correctly', () => {
        const result = renderHook(() => useExpend(true));
        expect(result.result.current[0]).toBe(true);
    });
    test('should expend on function call', () => {
        const result = renderHook(() => useExpend(false));
        const { expend } = result.result.current[1];
        act(() => {
            expend();
        });
        expect(result.result.current[0]).toBe(true);
    });
    test('should collapse on function call', () => {
        const result = renderHook(() => useExpend(true));
        const { collapse } = result.result.current[1];
        act(() => {
            collapse();
        });
        expect(result.result.current[0]).toBe(false);
    });
    test('should toggle on function call', () => {
        const result = renderHook(() => useExpend(false));
        const { toggle } = result.result.current[1];
        act(() => {
            toggle();
        });
        expect(result.result.current[0]).toBe(true);
    });
});
