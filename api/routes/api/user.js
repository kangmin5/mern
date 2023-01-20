const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const User = require('../../model/User');
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Please enter i password with 8 or more').isLength({
            min: 8,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;
        try {
            //유저가 존재하는지 체크
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User is already exists'
                    }]
                });
            }
            //유저가 아바타(프로필사진)
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name, email, password, avatar
            });

            // 비밀번호를 encrypt
            const salt = await bcrypt.genSalt(10); 
            user.password = await bcrypt.hash(password, salt);
            await user.save();

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