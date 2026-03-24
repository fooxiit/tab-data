import { useCallback, useState } from 'react';

function useExpend(initial: boolean) {
    const [isExpend, setIsExpend] = useState(initial);

    const expend = useCallback(() => setIsExpend(true), []);
    const collapse = useCallback(() => setIsExpend(false), []);
    const toggle = useCallback(() => setIsExpend((pervIsExpend) => !pervIsExpend), []);

    return [isExpend, { expend, collapse, toggle }] as const;
}
export default useExpend;
