import useTabDataContext from '../hook/useTabDataContext';

export default function PageControle({ colSpan }: { colSpan: number }) {
    const { pages } = useTabDataContext();
    if (!pages) return null;
    return (
        <tr>
            <td colSpan={colSpan}>
                <button onClick={pages.controle.prev} disabled={pages.currentPage === 0}>
                    Previous
                </button>
                <span>
                    {pages.currentPage + 1} / {pages.maxPage}
                </span>
                <button onClick={pages.controle.next} disabled={pages.currentPage === pages.maxPage - 1}>
                    Next
                </button>
            </td>
        </tr>
    );
}
