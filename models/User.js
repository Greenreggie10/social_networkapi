const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Username is required.',
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: 'Email address is required.',
            unique: true,
            trim: true,
            match: /[\w-.+]{1,30}@[\w-.]{1,30}\.[\w]{2,4}/
            // validate: {
            //     validator: function(string) {
            //         return /[\w-.+]{1,20}@[\w-.]{1,20}\.[\w]{2,4}/.test(string);
            //     },
            //     message: props => `${props.value} is not a valid email address.` 
            // }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// get number of friends
UserSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('User', UserSchema);

module.exports = User;