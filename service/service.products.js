import productDal from "../dal/dal.products.js"


const allProduct = async () => {
    const allProduct = await productDal.readFiles()
    console.log(allProduct)
    return allProduct
}

const oneProduct = async (id) => {
    const products = await productDal.readFiles()
    const requestedProduct = products.find((pro) => pro.id === id)
    return requestedProduct
}


const addProduct = async (product) => {
    try {
        const productsList = await productDal.readFiles()
        productsList.push(product)
        productDal.writeFiles(productsList)
        return 'the product has been successfully added'
    } catch (err) {
        return err
    }
}


const updateProduct = async (id, update) => {
    try {
        const productsList = await productDal.readFiles()
        const productIndex = productsList.findIndex(pro => pro.id == id)
        productsList[productIndex] = { ...productsList[productIndex], ...update};
        console.log(productsList)
        productDal.writeFiles(productsList)
        return 'product updated'
    } catch (err) {
        console.log(err)
        return err + 'check'
    }
}


const updateQuantity = async (id, update) => {
    try {
        const productsList = await productDal.readFiles()
        const productIndex = productsList.findIndex(pro => pro.id == id)
        productsList[productIndex] = { ...productsList[productIndex], ...update};
        console.log(productsList)
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
        console.log(productsList)
        const productIndex = productsList.findIndex(pro => pro.id == productToDelete)
        console.log(productIndex)
        // if (product === -1){
        //     return 'the product is not defined'
        // }
        productsList.splice(productIndex, 1) 
        console.log(productsList)
        productDal.writeFiles(productsList)
        return 'product is deleted'
    } catch (err) {
        console.log(err)
        return err + 'check'
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

export { productServices }