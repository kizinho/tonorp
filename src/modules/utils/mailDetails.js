const nodemailer = require("nodemailer");

const transporterMail = async (port, host, secure, user, pass) => {
    // create reusable transporter object using the default SMTP transport
    const transporterData = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
    });
    return transporterData

}

module.exports = { transporterMail }