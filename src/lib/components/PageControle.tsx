import useTabDataContext from '../hook/useTabDataContext';
import '../style/page-controleur.css';

export default function PageControle({ colSpan }: { colSpan: number }) {
    const { pages } = useTabDataContext();
    if (!pages) return null;
    return (
        <tr className="data-table__page-controleur">
            <td className="data-table__page-controleur__cell" colSpan={colSpan}>
                <div className="data-table__page-controleur__content">
                    <button className="data-table__page-controleur__button" onClick={pages.controle.prev} disabled={pages.currentPage === 0}>
                        Previous
                    </button>
                    <div className="data-table__page-controleur__page-info">
                        <span>
                            {pages.currentPage + 1} / {pages.maxPage}
                        </span>
                    </div>
                    <button className="data-table__page-controleur__button" onClick={pages.controle.next} disabled={pages.currentPage === pages.maxPage - 1}>
                        Next
                    </button>
                </div>
            </td>
        </tr>
    );
}
