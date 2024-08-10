const crypto = require('crypto')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: Buffer,
    required: true,
  },
  salt: Buffer,
  role: {
    type: String,
    default: "user"
  },
  otpExpiry: Date
})


// Define a virtual field for confirmPassword
/***
Explanation:
Virtual Field Creation:

javascript
Copy code
userSchema.virtual('confirmPassword')
This line defines a virtual field called confirmPassword on the userSchema. This field will not be saved in the database.

Setter Function:

javascript
Copy code
.set(function(value) {
  this._confirmPassword = value;
})
Purpose: The setter function is used to assign a value to the virtual field.
Details: When you set the value of confirmPassword, it assigns that value to a temporary property _confirmPassword. This is done because the actual field confirmPassword doesn't exist in the schema, so we need a way to store the value temporarily for validation purposes.
Example: If you do user.confirmPassword = 'mysecret', this setter function will be called, and this._confirmPassword will be set to 'mysecret'.
Getter Function:

javascript
Copy code
.get(function() {
  return this._confirmPassword;
});
Purpose: The getter function is used to retrieve the value of the virtual field.
Details: When you try to access the confirmPassword property, it returns the value stored in _confirmPassword.
Example: If you do console.log(user.confirmPassword), this getter function will be called, and it will return the value of this._confirmPassword.
How It's Used in Practice:
Setting the Virtual Field:
When creating or updating a user, you would set the confirmPassword field just like any other field. The value is stored temporarily in _confirmPassword.

javascript
Copy code
const newUser = new User({
  name: 'John Doe',
  email: 'john@ example.com',
  password: Buffer.from('hashedpassword'),
  salt: Buffer.from('randomsalt')
});

newUser.confirmPassword = 'plainpassword';
Using the Value for Validation:
During the pre('save') hook, you can access the _confirmPassword property to perform the validation before the user is saved to the database. This ensures that the confirmation logic is enforced without storing the confirmPassword in the database.

javascript
Copy code
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedConfirmPassword = crypto.pbkdf2Sync(this._confirmPassword, this.salt, 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(this.password, hashedConfirmPassword)) {
      throw new Error('Password and Confirm Password do not match');
    }
    next();
  } catch (err) {
    next(err);
  }
});
In summary, the virtual field confirmPassword allows you to handle the password confirmation logic within your application without persisting the confirmation password to the database, maintaining both security and data integrity.

 * ** */
userSchema.virtual('confirmPassword').set(function (value) {
  this._confirmPassword = value;
}).get(function () {
  return this._confirmPassword;
});

// Pre-save hook to validate passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedConfirmPassword = crypto.pbkdf2Sync(this._confirmPassword, this.salt, 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(this.password, hashedConfirmPassword)) {
      throw new Error('Password and Confirm Password do not match');
    }
    next();
  } catch (err) {
    next(err);
  }
});


// Pre-save hook to validate passwords
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const document = await this.model.findOne(this.getQuery());
      const { salt } = document;

      const hashedConfirmPassword = crypto.pbkdf2Sync(update.confirmPassword, salt, 310000, 32, 'sha256');

      if (!crypto.timingSafeEqual(update.password, hashedConfirmPassword)) {
        throw new Error('Password and Confirm Password do not match');
      }

    } catch (err) {
      return next(err);
    }
  }
  next();
});


const User = new mongoose.model('UserModel', userSchema)

userSchema.pre('save', function (next) {
  delete this.confirmPassword
  next()
})

module.exports = User