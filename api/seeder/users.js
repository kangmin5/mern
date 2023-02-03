const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;

const users = [
  {
   
    name: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
  },
  {
    _id: ObjectId('63db4f285b5d149be505f4f2'),
    name: 'John',
    email: 'john@doe.com',
    password: bcrypt.hashSync('john@doe.com', 10),
  },
]

module.exports = users
