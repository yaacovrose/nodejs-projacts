import { productServices } from "../service/service.js";

const getAllProducts = async (req, res) => {
    const users = await productServices.allProduct();
    res.status(200).json( users );
};


const productController = {
    getAllProducts,
}

export { productController }