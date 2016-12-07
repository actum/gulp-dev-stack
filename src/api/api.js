module.exports = () => {
    const usersCount = 10;
    const createUser = (val, i) => ({
        id: i,
        name: `${val}_${i}`
    });
    const data = {
        users: Array(usersCount)
            .fill('user')
            .map(createUser)
    };

    return data;
};
