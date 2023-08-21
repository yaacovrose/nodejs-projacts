import usersDal from "../dal/dal.users.js"
import bcrypt from 'bcrypt'

const allUsers = async () => {
    const allUsers = await usersDal.readFiles()
    console.log(allUsers)
    return allUsers
}

const oneUser = async (id) => {
    const users = await usersDal.readFiles()
    const requestedUser = users.find((user) => user.id === id)
    return requestedUser
}

const login = async (email, password) => {
    const users = await usersDal.readFiles()
    if (users.find(user => user.email === email && user.password === password)) {
        console.log(users)
        return 'user is connected'
    } else {
        return 'user not found'
    }
}


const addUser = async (user) => {
    const password = user.password
    const hash = bcrypt.hashSync(password, 5);
    try {
        user.password = hash
        const usersList = await usersDal.readFiles()
        usersList.push(user)
        usersDal.writeFiles(usersList)
        return 'the user has been successfully added'
    } catch (err) {
        return err
    }
}





const updateUser = async (id, update) => {
    try {
        const usersList = await usersDal.readFiles()
        const userIndex = usersList.findIndex(user => user.id == id)
        usersList[userIndex] = { ...usersList[userIndex], ...update };
        console.log(usersList)
        usersDal.writeFiles(usersList)
        return 'user updated'
    } catch (err) {
        console.log(err)
        return err + 'check'
    }
}


const deleteUser = async (userToDelete) => {
    try {
        const usersList = await usersDal.readFiles()
        console.log(usersList)
        const userIndex = usersList.findIndex(user => user.id == userToDelete)
        console.log(userIndex)
        // if (product === -1){
        //     return 'the product is not defined'
        // }
        usersList.splice(userIndex, 1)
        console.log(usersList)
        usersList.writeFiles(usersList)
        return 'user is deleted'
    } catch (err) {
        console.log(err)
        return err + 'check'
    }
}



const usersService = {
    allUsers,
    oneUser,
    login,
    addUser,
    updateUser,
    deleteUser,
}

export { usersService }