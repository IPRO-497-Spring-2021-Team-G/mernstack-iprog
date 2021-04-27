// Use express router
const express = require('express');
const Admin = require('../../models/admin.model');
// Set router var to express.Router
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Bring in Item model from the models folder
const Item = require ('../../models/admin.model');

// @route   POST api/admins
// @desc    Register a new admin
// @access  Public
// Use slash to represent api/items endpoint
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password ) {
        // 400 -- bad request
        return res.status(400).json({ msg: 'Please enter all fields'});
    }
    
    // Check for existing user
    User.findOne({ email: email })
        // Sync away??
        .then(admin => {
            if(admin) {
                res.status(400).json({ msg: 'Admin already exists'});
            }
            const newAdmin = new Admin({
                name,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAdmin.password = hash;
                    newAdmin.save()
                        .then(admin => {
                            // Create jwt token, make sure the token is accessing a specific admin
                            jwt.sign(
                                { id: admin.id }, 
                                config.get('jwtSecret'),
                                // Optional: token will last for an hour
                                { expiresIn: 3600 },
                                // Callback param, asynchronous
                                (err, token) => {
                                    if (err) throw err;
                                    // Response
                                    res.json({
                                        token: token,
                                        admin: {
                                            id: admin.id,
                                            name: admin.name,
                                            email: admin.email
                                        }
                                    });
                                }
                            )
                    });
                })
            })
        })
});

module.exports = router;