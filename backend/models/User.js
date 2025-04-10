const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  mobile: {
    type: String,
    trim: true,
    unique: true,
    sparse: true, // Allows null/undefined values to not trigger unique constraint
    match: [/^\+?[1-9]\d{9,14}$/, 'Please enter a valid mobile number']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Don't return password in queries by default
  },
  salt: {
    type: String,
    select: false
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  education: {
    institution: String,
    degree: String,
    fieldOfStudy: String,
    graduationYear: Number
  },
  skills: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function(password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex');
  
  // Hashing user's salt and password with 1000 iterations
  this.password = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    'sha512'
  ).toString('hex');
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    'sha512'
  ).toString('hex');
  
  return this.password === hash;
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);