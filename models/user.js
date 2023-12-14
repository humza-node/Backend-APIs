const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        email:
        {
            type: String, 
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        resetToken: String,
        resetTokenExpiration: Date,
        otp: String,
        name:{
            type: String,
            required: true
        },
cart:
{
    items: [
{
planId:
{
    type: Schema.Types.ObjectId,
    ref: 'Plans',
    required: true
},
quantity: 
{
    type: Number,
    required: true
}
} ]
}
}
);
userSchema.methods.addToPlans = function(plans)
{
    const cartPlanIndex = this.cart.items.findIndex(cp =>
        {
            return cp.planId.toString() === plans._id.toString(); 
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if(cartPlanIndex >= 0)
        {
newQuantity = this.cart.items[cartPlanIndex].quantity + 1;
updatedCartItems[cartPlanIndex].quantity = newQuantity;
        }
        else
        {
            updatedCartItems.push(
                {
                    planId: plans._id,
                    quantity: newQuantity
                }
            );
        }
        const updatedCart = 
        {
            items: updatedCartItems
        };
        this.cart = updatedCart;
        return this.save();
};
userSchema.methods.removeFromPlans = function(planId) 
{
const updatedCartItems = this.cart.items.filter(item =>
    {
        return item.planId.toString() !== planId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};
userSchema.methods.clearPlans = function()
{
this.cart = { item: [] };
return this.save();
};
module.exports = mongoose.model('User',userSchema);
