import productDal from "../dal/dal.js"


const allProduct = async () => {
    const allProduct = await productDal.readFiles()
    console.log(allProduct)
    return allProduct
}


const productServices = {
    allProduct,
}

export { productServices }