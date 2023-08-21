import { usersService } from "../service/service.users.js";

const getAllUsers = async (req, res) => {
    const users = await usersService.allUsers();
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const id = +req.params.id;
    const user = await usersService.oneUser(id);
    res.status(200).json(user)
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await usersService.login(email, password);
        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        return err
    }
}

const addUser = async (req, res) => {
    try {
        const newUser = req.body;
        const add = await usersService.addUser(newUser);
        console.log(add)
        res.status(200).send(add)
    }
    catch (err) {
        res.status(404).send('user is nut added')
    }
}


const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const updateDetails = req.body;
        const update = await usersService.updateUser(id, updateDetails);
        res.status(200).json(update)
    }
    catch (err) {
        res.status(404).send('product not updated')
    }
}


const deleteUser = async (req, res) => {
    try {
        const userToDelete = +req.params.id
        const deletes = await usersService.deleteUser(userToDelete);
        res.status(200).send(deletes)
    }
    catch (err) {
        res.status(404).send('product is not deleted')
    }
}



const usersController = {
    getAllUsers,
    getUserById,
    login,
    addUser,
    updateUser,
    deleteUser
}

export { usersController }