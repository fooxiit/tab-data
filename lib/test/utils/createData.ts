function createData(number: number) {
    const city = ['Los Angeles', 'New York', 'Houston', 'Miami', 'Chicago', 'Seattle', 'Denver', 'San Francisco', 'New York'];
    const departement = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT', 'Legal', 'Marketing'];
    const role = ['Software Engineer', 'Marketing Manager', 'Sales Associate', 'HR Specialist', 'Financial Analyst', 'Operations Manager', 'IT Specialist', 'Legal Assistant', 'Marketing Coordinator'];
    const zipCode = ['12345', '67890', '54321', '09876', '11223', '33445', '55667', '99887', '11223'];
    const street = ['123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm St', '555 Maple Dr', '666 Oak St', '777 Pine St', '888 Cedar Ln', '999 Oak St'];
    const state = ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Washington', 'Colorado', 'California', 'New York'];
    const satus = ['active', 'inactive'];
    const firstName = ['John ', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace'];
    const lastName = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Taylor', 'Moore', 'Lee'];
    const datas = [];
    for (let i = 0; i < number; i++) {
        const firstNameRandom = firstName[Math.floor(Math.random() * firstName.length)];
        const lastNameRandom = lastName[Math.floor(Math.random() * lastName.length)];

        datas.push({
            id: `${i}`,
            firstName: firstNameRandom,
            lastName: lastNameRandom,
            email: `${firstNameRandom.toLowerCase()}.${lastNameRandom.toLowerCase()}@example.com`,
            satus: satus[Math.floor(Math.random() * satus.length)],
            departement: departement[Math.floor(Math.random() * departement.length)],
            role: role[Math.floor(Math.random() * role.length)],
            contry: 'USA',
            zipCode: zipCode[Math.floor(Math.random() * zipCode.length)],
            state: state[Math.floor(Math.random() * state.length)],
            street: street[Math.floor(Math.random() * street.length)],
            city: city[Math.floor(Math.random() * city.length)],
            lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        });
    }
    return datas;
}
export default createData;
