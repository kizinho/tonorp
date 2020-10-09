/* eslint-disable camelcase */
const nodemailer = require("nodemailer");
const { User } = require('../../models/index');
const Validate = require('../modules/utils/ValidateUser');
const { hash } = require('../modules/utils/hashPassword');

/** check user email
 * @param {string} email - Email address
 * Checks that a  email address exists in the database
 */
const forgotPassword = async (email) => {
    const validateuser = new Validate({ email });
    if (!validateuser.validateEmail()) {
        throw new Error('Invalid email was provided');
    }
    const getEmail = await User.findOne({
        where: {
            email,
        }
    });
    if (getEmail) {
        
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: '3d304ab625e965',
                pass: '60b456bc30222a',
            },
        });
        const pin = Math.floor(1000 + Math.random() * 9000);
      await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        return pin;
    }
    throw new Error('Email provided does not exist');
};

const resetPassword = async (password, email) => {
    if (!password) {
        throw new Error('password required');
    }
    const validateuser = new Validate({ email });
    if (!validateuser.validateEmail()) {
        throw new Error('Invalid email was provided');
    }
    const hashPassword = await hash(password);
    const user = await User.update({ password: hashPassword }, {
        where: {
            email
        }
    });
    return user;
};


module.exports = { forgotPassword, resetPassword };
