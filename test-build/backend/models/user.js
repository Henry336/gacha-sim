const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: { type: String, default: 'My Pet' },
    level: { type: Number, default: 1 },
    exp: { type: Number, default: 0 },
    requiredExp: { type: Number, default: 100 },
    focus: { type: Number, default: 5 },
    determination: { type: Number, default: 1 }
}, { _id: false, __v: false })

const inventoryItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    rarity: { type: String , enum: ['Common', 'Rare', 'Epic', 'Legendary', 'Exclusive'], default: 'Common'}
}, { _id: false, __v: false })

const userSchema = new mongoose.Schema({
    canvasUserId: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    encryptedCanvasToken: { type: String, required: true },
    gachaTokens: { type: Number, default: 0 },
    premiumTokens: { type: Number, default: 0 },
    pet: { type: petSchema, default: () => ({}) }, // this initializes the default pet
    inventory: [inventoryItemSchema] // array of inventory item objects defined above
}, { __v: false })

module.exports = mongoose.model('User', userSchema)