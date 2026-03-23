import './App.css';
import TabData from './lib/components/TabData';
const MOCKED_DATA = [
    {
        id: '1',
        firstName: 'John ',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        satus: 'active',
        departement: 'Engineering',
        role: 'Software Engineer',
        contry: 'USA',
        zipCode: '12345',
        state: 'California',
        street: '123 Main St',
        city: 'Los Angeles',
        lastLogin: '2024-06-01T12:00:00Z',
        createdAt: '2024-01-01T12:00:00Z',
        updatedAt: '2024-05-01T12:00:00Z',
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        satus: 'active',
        departement: 'Marketing',
        role: 'Marketing Manager',
        contry: 'USA',
        zipCode: '67890',
        state: 'New York',
        street: '456 Oak Ave',
        city: 'New York',
        lastLogin: '2024-06-01T12:00:00Z',
        createdAt: '2024-01-01T12:00:00Z',
        updatedAt: '2024-05-01T12:00:00Z',
    },
    {
        id: '3',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        satus: 'active',
        departement: 'Sales',
        role: 'Sales Associate',
        contry: 'USA',
        zipCode: '54321',
        state: 'Texas',
        street: '789 Pine Rd',
        city: 'Houston',
        lastLogin: '2024-06-01T12:00:00Z',
        createdAt: '2024-01-01T12:00:00Z',
        updatedAt: '2024-05-01T12:00:00Z',
    },
    {
        id: '4',
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        satus: 'active',
        departement: 'HR',
        role: 'HR Specialist',
        contry: 'USA',
        zipCode: '09876',
        state: 'Florida',
        street: '321 Elm St',
        city: 'Miami',
        lastLogin: '2024-06-01T12:00:00Z',
        createdAt: '2024-01-01T12:00:00Z',
        updatedAt: '2024-05-01T12:00:00Z',
    },
    {
        id: '5',
        firstName: 'Charlie',
        lastName: 'Davis',
        email: 'charlie.davis@example.com',
        satus: 'active',
        departement: 'Finance',
        role: 'Financial Analyst',
        contry: 'USA',
        zipCode: '11223',
        state: 'Illinois',
        street: '555 Maple Dr',
        city: 'Chicago',
        lastLogin: '2024-06-01T12:00:00Z',
        createdAt: '2024-01-01T12:00:00Z',
        updatedAt: '2024-05-01T12:00:00Z',
    },
];

function App() {
    return (
        <>
            <TabData
                datas={MOCKED_DATA}
                rowModel={{
                    columns: [
                        { dataKey: 'firstName', label: 'Firsname' },
                        { dataKey: 'lastName', label: 'LastName' },
                        { dataKey: 'departement', label: 'departement' },
                        { dataKey: 'contry', label: 'Contry' },
                        { dataKey: 'state', label: 'State' },
                        { dataKey: 'city', label: 'City' },
                        { dataKey: 'street', label: 'Street' },
                        { dataKey: 'satus', label: 'Status' },
                    ],
                    sort: true,
                }}
            />
        </>
    );
}

export default App;
