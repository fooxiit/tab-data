import useTabDataContext from '../hook/useTabDataContext';
import '../style/page-controleur.css';
//Contrôles de pagination (boutons Précédent / Suivant, numéro de page).
export default function PageControle({ colSpan, className }: { colSpan: number; className?: string }) {
    const { pages } = useTabDataContext();
    if (!pages) return null;
    return (
        <tr className={className ? `${className}__page-controleur` : 'data-table__page-controleur'}>
            <td className={className ? `${className}__page-controleur__cell` : 'data-table__page-controleur__cell'} colSpan={colSpan}>
                <div className={className ? `${className}__page-controleur__content` : 'data-table__page-controleur__content'}>
                    <button className={className ? `${className}__page-controleur__button` : 'data-table__page-controleur__button'} onClick={pages.controle.prev} disabled={pages.currentPage === 0}>
                        Previous
                    </button>
                    <div className={className ? `${className}__page-controleur__page-info` : 'data-table__page-controleur__page-info'}>
                        <span>
                            {pages.currentPage + 1} / {pages.maxPage}
                        </span>
                    </div>
                    <button
                        className={className ? `${className}__page-controleur__button` : 'data-table__page-controleur__button'}
                        onClick={pages.controle.next}
                        disabled={pages.currentPage === pages.maxPage - 1}
                    >
                        Next
                    </button>
                </div>
            </td>
        </tr>
    );
}
