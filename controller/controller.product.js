import { productServices } from "../service/service.products.js";

const getAllProducts = async (req, res) => {
    const products = await productServices.allProduct();
    res.status(200).json(products);
};

const getProductById = async (req, res) => {
    const id = +req.params.id;
    const product = await productServices.oneProduct(id);
    res.status(200).json(product)
}


const addProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const add = await productServices.addProduct(newProduct);
        res.status(200).json(newProduct)
    }
    catch (err){
        res.status(404).send('product is nut added')
    }
}


const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const updateDetails = req.body;
        const update = await productServices.updateProduct(id, updateDetails);
        res.status(200).json(update)
    }
    catch (err){
        res.status(404).send('product not updated')
    }
}


const updateQuantity = async (req, res) => {
    try {
        const id = req.params.id
        const quantity = req.body;
        const update = await productServices.updateQuantity(id, quantity);
        res.status(200).json(update)
    }
    catch (err){
        res.status(404)
    }
}



const deleteProduct = async (req, res) => {
    try {
        const productToDelete = +req.params.id
        const deletes = await productServices.deleteProduct(productToDelete);
        res.status(200).send(deletes)
    }
    catch (err){
        res.status(404).send('product is not deleted')
    }
}



const productController = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    updateQuantity,
    deleteProduct,
}

export { productController }