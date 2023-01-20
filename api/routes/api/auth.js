const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../model/User')
const {check,validationResult} = require('express-validator');
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

//미들웨어를 통과해 토큰을 가져오면 object나옴
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(501).send('Server error')
    }

})

// Login
router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Please enter i password with 8 or more').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        try {
            //유저가 존재하는지 체크
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User is not exists'
                    }]
                });
            }
            // 암호 check
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User is not exists'
                    }]
                });
            }


            // 비밀번호를 jsonwebtoken 사용하여 return
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    })
                }
            )

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error: ' + err.message);
        }

    }
);

module.exports = router;