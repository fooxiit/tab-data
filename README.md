# tab-data

Librairie React générique pour afficher et gérer des tableaux de données avec tri, filtrage et pagination.

---

## Sommaire

- [Installation](#installation)
- [Utilisation rapide](#utilisation-rapide)
- [Composants](#composants)
    - [TabData](#tabdata)
    - [DataRow](#datarow)
    - [FilterSelector](#filterselector)
    - [PageControle](#pagecontrole)
    - [RowLabel](#rowlabel)
- [Hooks](#hooks)
    - [useTabData](#usetabdata)
    - [useFilter](#usefilter)
    - [useSelectSort](#useselectsort)
    - [usePageSelector](#usepageselector)
    - [useSearch](#usesearch)
    - [useExtractFilterOption](#useextractfilteroption)
    - [useExpend](#useexpend)
    - [useTabDataContext](#usetabdatacontext)
- [Types](#types)
- [Personnalisation des styles](#personnalisation-des-styles)

---

## Installation

```bash
npm install tab-data
```

**Prérequis :** React 19+

---

## Utilisation rapide

```tsx
import TabData from '@fooxit/tab-data';

type Employee = {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
};

const employees: Employee[] = [
    { id: '1', firstName: 'Alice', lastName: 'Martin', department: 'RH' },
    { id: '2', firstName: 'Bob', lastName: 'Dupont', department: 'IT' },
];

const rowModel = {
    columns: [
        { dataKey: 'firstName', label: 'Prénom' },
        { dataKey: 'lastName', label: 'Nom' },
        { dataKey: 'department', label: 'Département' },
    ],
    idKey: 'id',
    sort: true,
    filter: true,
};

export default function App() {
    return <TabData id="employees-table" datas={employees} rowModel={rowModel} maxRow={10} />;
}
```

---

## Composants

### `TabData`

Composant principal qui orchestre le tableau complet (en-têtes, lignes, pagination, filtres, tri).

```tsx
<TabData id="my-table" datas={data} rowModel={rowModel} maxRow={10} className="my-table" />
```

| Prop        | Type              | Obligatoire | Description                                             |
| ----------- | ----------------- | ----------- | ------------------------------------------------------- |
| `id`        | `string`          | Oui         | Identifiant unique du tableau                           |
| `datas`     | `D[]`             | Oui         | Tableau de données génériques                           |
| `rowModel`  | `RowModelType<D>` | Oui         | Modèle de colonnes (voir [Types](#types))               |
| `maxRow`    | `number`          | Non         | Nombre maximum de lignes par page (par défaut : toutes) |
| `className` | `string`          | Non         | Préfixe de classe CSS appliqué aux éléments             |

---

### `DataRow`

Rend une ligne `<tr>` à partir d'un objet de données et d'un modèle de colonnes.

```tsx
<DataRow id={item.id} data={item} rowModel={{ ...rowModel, tabId: 'my-table' }} className="my-table" />
```

| Prop        | Type                      | Description                              |
| ----------- | ------------------------- | ---------------------------------------- |
| `id`        | `unknown`                 | Clé unique de la ligne                   |
| `data`      | `Record<string, unknown>` | Données de la ligne                      |
| `rowModel`  | `RowModelTypeExtend<D>`   | Modèle de colonnes étendu (avec `tabId`) |
| `className` | `string`                  | Préfixe de classe CSS                    |

---

### `FilterSelector`

Menu déroulant de filtrage avec barre de recherche interne. S'affiche automatiquement dans les en-têtes de colonnes lorsque `rowModel.filter === true`.

```tsx
<FilterSelector
    option={[
        ['Alice', true],
        ['Bob', false],
    ]}
    onFilterSelect={(value) => console.log(value)}
    className="my-table"
/>
```

| Prop             | Type                       | Description                                  |
| ---------------- | -------------------------- | -------------------------------------------- |
| `option`         | `[unknown, boolean][]`     | Liste des options avec leur état sélectionné |
| `onFilterSelect` | `(value: unknown) => void` | Callback au clic sur une option              |
| `className`      | `string`                   | Préfixe de classe CSS                        |

Retourne `undefined` si aucune option n'est fournie.

---

### `PageControle`

Contrôles de pagination (boutons Précédent / Suivant, numéro de page). Utilise le contexte `TabDataContext` — doit être placé à l'intérieur d'un `TabData`.

```tsx
<PageControle colSpan={4} className="my-table" />
```

| Prop        | Type     | Description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| `colSpan`   | `number` | Nombre de colonnes couvertes par la cellule de pagination |
| `className` | `string` | Préfixe de classe CSS                                     |

Retourne `null` si le contexte de pages n'est pas disponible.

---

### `RowLabel`

Rend la ligne d'en-têtes `<thead>` avec les libellés, indicateurs de tri et filtres.

```tsx
<RowLabel rowModel={rowModel} className="my-table" />
```

| Prop        | Type              | Description           |
| ----------- | ----------------- | --------------------- |
| `rowModel`  | `RowModelType<D>` | Modèle de colonnes    |
| `className` | `string`          | Préfixe de classe CSS |

---

## Hooks

### `useTabData`

Hook principal qui applique le filtrage, le tri et la pagination sur un tableau de données.

```tsx
const { filtedDatas } = useTabData({
    datas,
    isSort: true,
    isFilter: true,
    maxRow: 10,
    filter,
    sortByValue,
    page: currentPage,
});
```

| Paramètre     | Type                         | Description                 |
| ------------- | ---------------------------- | --------------------------- |
| `datas`       | `D[]`                        | Données sources             |
| `isSort`      | `boolean`                    | Active le tri               |
| `isFilter`    | `boolean`                    | Active le filtrage          |
| `maxRow`      | `number`                     | Lignes max par page         |
| `filter`      | `Map<keyof D, Set<unknown>>` | Filtres actifs              |
| `sortByValue` | `SortBy<D> \| null`          | Colonne et direction de tri |
| `page`        | `number`                     | Page courante               |

**Retourne :** `{ filtedDatas: D[] }`

---

### `useFilter`

Gère l'état des filtres actifs. Chaque appel à `filterBy` active ou désactive un filtre (comportement de bascule).

```tsx
const { filter, filterBy } = useFilter<Employee>();

// Activer/désactiver le filtre "IT" sur la colonne "department"
filterBy('department', 'IT');
```

**Retourne :**

| Propriété  | Type                                     | Description        |
| ---------- | ---------------------------------------- | ------------------ |
| `filter`   | `Map<keyof D, Set<unknown>>`             | Filtres actifs     |
| `filterBy` | `(key: keyof D, value: unknown) => void` | Basculer un filtre |

---

### `useSelectSort`

Gère l'état du tri en faisant cycler les directions : `asc` → `desc` → aucun.

```tsx
const { sortByValue, sortBy } = useSelectSort<Employee>();

sortBy('lastName'); // Premier appel : tri ASC
sortBy('lastName'); // Second appel : tri DESC
sortBy('lastName'); // Troisième appel : pas de tri
```

**Retourne :**

| Propriété     | Type                     | Description                  |
| ------------- | ------------------------ | ---------------------------- |
| `sortByValue` | `SortBy<D> \| null`      | Colonne et direction actives |
| `sortBy`      | `(key: keyof D) => void` | Changer/cycler le tri        |

---

### `usePageSelector`

Gère la pagination : page courante, page maximale et contrôles de navigation.

```tsx
const { currentPage, maxPage, controle } = usePageSelector(
    employees.length, // longueur totale
    10, // lignes par page
    1, // page initiale
);

controle.next(); // page suivante
controle.prev(); // page précédente
controle.set(3); // aller à la page 3
```

**Retourne :**

| Propriété       | Type                     | Description                |
| --------------- | ------------------------ | -------------------------- |
| `currentPage`   | `number`                 | Page actuelle              |
| `maxPage`       | `number`                 | Nombre total de pages      |
| `controle.next` | `() => void`             | Aller à la page suivante   |
| `controle.prev` | `() => void`             | Aller à la page précédente |
| `controle.set`  | `(page: number) => void` | Aller à une page précise   |

---

### `useSearch`

Filtre une liste de données selon une valeur de recherche saisie, avec un debounce de 250 ms.

```tsx
const { searchValue, searchResult, onSearchChange } = useSearch(employees, (item, value) => item.firstName.toLowerCase().includes(value.toLowerCase()));

<input value={searchValue} onChange={onSearchChange} />;
```

**Retourne :**

| Propriété        | Type                                         | Description                           |
| ---------------- | -------------------------------------------- | ------------------------------------- |
| `searchValue`    | `string`                                     | Valeur courante du champ de recherche |
| `searchResult`   | `D[]`                                        | Données filtrées                      |
| `onSearchChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | Handler du champ de recherche         |

---

### `useExtractFilterOption`

Extrait les valeurs uniques de chaque colonne pour alimenter les menus de filtres.

```tsx
const filterOptions = useExtractFilterOption(employees, true);
// Map { 'department' => Set { 'RH', 'IT' }, 'firstName' => Set { 'Alice', 'Bob' } }
```

Retourne `null` si `isFilter` est `false` ou `undefined`.

---

### `useExpend`

Gère un état d'expansion / réduction (utilisé en interne par `FilterSelector`).

```tsx
const [isExpend, { expend, collapse, toggle }] = useExpend(false);
```

**Retourne :** `[boolean, { expend: () => void, collapse: () => void, toggle: () => void }]`

---

### `useTabDataContext`

Accède au contexte partagé `TabDataContext`. Doit être utilisé à l'intérieur d'un composant `TabData`.

```tsx
const { filterBy, sortBy, pages } = useTabDataContext();
```

Lance une erreur si utilisé en dehors du contexte.

---

## Types

### `RowModelType<D>`

Définit la structure du tableau : colonnes à afficher, clé d'identification, et options de tri/filtrage.

```typescript
interface RowModelType<D> {
    columns: { dataKey: keyof D; label: string }[];
    idKey: keyof D;
    sort?: boolean;
    filter?: boolean;
}
```

### `SortBy<D>`

```typescript
type SortBy<D extends Record<string, string>> = {
    key: keyof D;
    direction: 'asc' | 'desc';
};
```

### `ArrayElement<T>`

Utilitaire TypeScript pour extraire le type d'élément d'un tableau.

```typescript
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
```

---

## Personnalisation des styles

Chaque composant accepte une prop `className` qui est utilisée comme **préfixe** sur les éléments internes. Par exemple, avec `className="my-table"` :

```html
<table class="my-table">
    <thead>
        <tr class="my-table__header-row">
            <th class="my-table__header-cell">...</th>
        </tr>
    </thead>
    <tbody>
        <tr class="my-table__row">
            ...
        </tr>
    </tbody>
</table>
```

Les styles par défaut sont importés automatiquement via les fichiers CSS internes (`data-table.css`, `data-row.css`, `row-label.css`, `page-controleur.css`). Vous pouvez les surcharger avec vos propres règles CSS.
