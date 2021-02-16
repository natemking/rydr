const bcrypt = require('bcrypt');

//*** User Model ***//
//==================//
module.exports = (mongoose, Schema) => {

    const UserSchema = new Schema({
        userName: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: async (value) => {
                    try {
                        const result = await User.findOne({ userName: value });
                        return result  ? false : true;
                    } catch (err) { throw new Error(err) }
                },
                message: props => `${props.value} already exists in Rydr!`
            }
        },
        password: {
            type: String,
            required: true
        },
        bandId:{
                type: Schema.Types.ObjectId,
                ref: 'Band'
        },
    },
    { timestamps: true });


UserSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password, 10, (err, passwordHash) =>{
        if(err){
            return next(err);
        }
        this.password= passwordHash;
        next();
    })
});

UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        if (err){
            return cb(err, {message:"Couldn't connect to data base"})
        } else{
            if(!isMatch){
                return cb(null, isMatch, {message:"Passwords don't match"});
            }
            return cb(null, this, {message: "Successful login"});    
        }
    })  
};


    const User = mongoose.model('User', UserSchema);

    return User;
}


