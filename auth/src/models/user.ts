import mongoose from "mongoose";
import { Password } from "../services/password";

interface userAttrs {
    email: string;
    password: string
}

// An interface that describes the properties the userModel has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: userAttrs): UserDoc
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    createdAt: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    // "this" here can get us the password from the document stored in MongoDB
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
