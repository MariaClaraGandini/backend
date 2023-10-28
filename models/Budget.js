const mongoose= require('mongoose')
const Budget = mongoose.model('Budget',{
	name: String,
	email: String,
    phone: String,
    state: String,
    city: String,
    musicaltraining: String,
}
)
module.exports = Budget;