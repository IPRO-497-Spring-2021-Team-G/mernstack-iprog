// Use express router
const express = require('express');
const Admin = require('../../models/Admin');
// Set router var to express.Router
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Bring in Item model from the models folder
const Item = require ('../../models/Admin');

// @route   POST api/auth
// @desc    Authenticate an Admin
// @access  Public
// Use slash to represent api/items endpoint
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if ( !email || !password ) {
        // 400 -- bad request
        return res.status(400).json({ msg: 'Please enter all fields'});
    }
    
    // Check for existing admin
    Admin.findOne({ email: email })
        // Sync away??
        .then(admin => {
            if (!admin) {
                res.status(400).json({ msg: 'Admin does not exist'});
            }

            // Validate password: take plain text password and compare with the saved enrypted password
            bcrypt.compare(password, admin.password)
            .then(isMatch => {
                if (!isMatch) 
                {
                    return res.status(400).json({ msg: 'Invalid credentials'});
                }

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
                            user: {
                                id: admin.id,
                                name: admin.name,
                                email: admin.email
                            }
                        });
                    }
                )
            })
        })
});

// @route   GET api/auth/admin
// @desc    Get admin data
// @access  Private
// Validate admin with the token
router.get('/admin', auth, (req, res) => {
    User.findById(req.admin.id)
        // Disregard the password
        .select('-password')
        .then(admin => res.json(admin));
});

module.exports = router;