module.exports = () => {
    const createUser = id => ({
        id,
        name: `user_${id}`
    });
    const users = [];
    const usersCount = 10;
    for (let i = 0; i < usersCount; i++) {
        users.push(createUser(i));
    }

    return { users };
};
