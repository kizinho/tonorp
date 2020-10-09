/* eslint-disable camelcase */
const { User } = require('../../models/index');
const Validate = require('../modules/utils/ValidateUser');
const { hash } = require('../modules/utils/hashPassword');
const { transporterMail } = require('../modules/utils/mailDetails');
/** check user email
 * @param {string} email - Email address
 * Checks that a  email address exists in the database
 */
const forgotPassword = async (email) => {
    const validateuser = new Validate({ email });
    if (!validateuser.validateEmail()) {
        throw new TypeError('Invalid email was provided');
    }
    const getEmail = await User.findOne({
        where: {
            email,
        }
    });
    if (getEmail) {
        const pin = Math.floor(1000 + Math.random() * 9000);
        const transporter = await transporterMail(2525, 'smtp.mailtrap.io', false, '3d304ab625e965', '60b456bc30222a');

        await transporter.sendMail({
            from: 'support@tornop@gmail.com',
            to: email,
            subject: "Reset Password Pin",
            html: `<b>Hello </b>  ${getEmail.username} your reset code is : ${pin}`,
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
