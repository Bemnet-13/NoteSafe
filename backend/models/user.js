import passportLocalMongoose from "passport-local-mongoose";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("users", userSchema);

export default User;
