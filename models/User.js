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
                message: props => `${props.value} already exists`
            }
        },
        password: {
            type: String,
            required: true
        },
        bandId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Band'
            }
        ],
    },
    { timestamps: true });

    const User = mongoose.model('User', UserSchema);

    return User;
}