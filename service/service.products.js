import productDal from "../dal/dal.products.js"


const allProduct = async () => {
    const allProduct = await productDal.readFiles();
    return allProduct;
}

const oneProduct = async (id) => {
    const products = await productDal.readFiles();
    const requestedProduct = products.find((pro) => pro.id === id);
    return requestedProduct;
}


const addProduct = async (product) => {
    try {
        const productsList = await productDal.readFiles()
        product.id = id(productsList)
        productsList.push(product);
        productDal.writeFiles(productsList);
        return 'the product has been successfully added';
    } catch (err) {
        return err; 
    }
}

function id (products) {
    let maxId = 0
    products.forEach((element) => {
        if (+element.id > maxId){
            maxId = element.id 
        }
    });
    const nextId = maxId + 1
    return nextId
}


const updateProduct = async (id, update) => {
    try {
        const productsList = await productDal.readFiles()
        const productIndex = productsList.findIndex(pro => pro.id == id)
        productsList[productIndex] = { ...productsList[productIndex], ...update};
        productDal.writeFiles(productsList)
        return 'product updated'
    } catch (err) {
        return err 
    }
}


const updateQuantity = async (id, update) => {
    try {
        const productsList = await productDal.readFiles()
        const productIndex = productsList.findIndex(pro => pro.id == id)
        productsList[productIndex] = { ...productsList[productIndex], ...update};
        productDal.writeFiles(productsList)
        return 'quantity updated'
    } catch (err) {
        console.log(err)
        return err + 'check'
    }
}


const deleteProduct = async (productToDelete) => {
    try {
        const productsList = await productDal.readFiles()
        const productIndex = productsList.findIndex(pro => pro.id == productToDelete)
        productsList.splice(productIndex, 1) 
        productDal.writeFiles(productsList)
        return 'product is deleted'
    } catch (err) {
        return err 
    }
}



const productServices = {
    allProduct,
    oneProduct,
    addProduct,
    updateProduct,
    updateQuantity,
    deleteProduct,
}

export default productServices 