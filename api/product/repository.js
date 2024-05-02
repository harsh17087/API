const Product2 = require("./model");
exports.products = async () => {
    const products = await Product2.find();
    return products;
};
exports.productById = async id => {
    const product = await Product2.findById(id);
    return product;
}
exports.createProduct = async payload => {
    const newProduct = await Product2.create(payload);
    return newProduct
}
exports.removeProduct = async id => {
    const product = await Product2.findByIdAndRemove(id);
    return product
}