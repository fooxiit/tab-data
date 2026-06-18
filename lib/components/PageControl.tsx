import useTabDataContext from '../hook/useTabDataContext';
import '../style/page-controller.css';
//Contrôles de pagination (boutons Précédent / Suivant, numéro de page).
export default function PageControl({ colSpan, className }: { colSpan: number; className?: string }) {
    const { pages } = useTabDataContext();
    if (!pages) return null;
    return (
        <tr className={className ? `${className}__page-controller` : 'data-table__page-controller'}>
            <td className={className ? `${className}__page-controller__cell` : 'data-table__page-controller__cell'} colSpan={colSpan}>
                <div className={className ? `${className}__page-controller__content` : 'data-table__page-controller__content'}>
                    <button className={className ? `${className}__page-controller__button` : 'data-table__page-controller__button'} onClick={pages.Control.prev} disabled={pages.currentPage === 0}>
                        Previous
                    </button>
                    <div className={className ? `${className}__page-controller__page-info` : 'data-table__page-controller__page-info'}>
                        <span>
                            {pages.currentPage + 1} / {pages.maxPage}
                        </span>
                    </div>
                    <button
                        className={className ? `${className}__page-controller__button` : 'data-table__page-controller__button'}
                        onClick={pages.Control.next}
                        disabled={pages.currentPage === pages.maxPage - 1}
                    >
                        Next
                    </button>
                </div>
            </td>
        </tr>
    );
}
