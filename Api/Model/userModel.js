const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please enter your name'],
   },
   email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
   },
   password: {
      type: String,
      required: [true, 'Please enter your password'],
   },
   confirmPassword: {
      type: String,
      required: [true, 'Please enter your password'],
      validate: {
         validator: function (el) {
            return el === this.password;
         },
         message: 'Password is not matches',
      },
   },
});

userSchema.pre('save', async function (next) {
   // Only run this function if password was actually modified
   if (!this.isModified('password')) return next();

   // Hash the password with cost of 12
   this.password = await bcrypt.hash(this.password, 12);

   // Delete confirmPassword field
   this.confirmPassword = undefined;
   next();
});

// this function is called when user want to change password
userSchema.pre('save', function (next) {
   if (!this.isModified('password') || this.isNew) return next();

   this.confirmPassword = Date.now() - 1000;
   next();
});

// checking for password change
userSchema.pre(/^find/, function (next) {
   // this points to the current query
   this.find({ active: { $ne: false } });
   next();
});

userSchema.methods.correctPassword = async function (
   candidatePassword,
   userPassword
) {
   return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
   if (this.passwordChangeAt) {
      const changeTimestamp = parseInt(
         this.passwordChangeAt.getTime() / 1000,
         10
      );
      return JWTTimestamp < changeTimestamp;
   }

   // False means not changed
   return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
