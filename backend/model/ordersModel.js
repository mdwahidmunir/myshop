const mongoose = require('mongoose')

const ordersSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserModel'
    },
    orderItems: [
        {
            qty: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'ProductModel'
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    status: {
        type: String,
        default: "Pending"
    },
    itemsPrice: {
        type: Number,
        required: true,
    },
    taxPrice: {
        type: Number,
        required: true,
    },
    shippingPrice: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
}, { timestamps: true, })


ordersSchema.pre('validate', async function (next) {
    if (!this.isNew) return next();

    const lastOrder = await Orders.findOne().sort({ createdAt: -1 });

    const orderIdNumber = lastOrder ? parseInt(lastOrder.orderId.split('#')[1], 10) + 1 : 1;

    this.orderId = `Order#${String(orderIdNumber).padStart(5, '0')}`;

    next();
});

const Orders = mongoose.model('OrdersModel', ordersSchema)

module.exports = Orders