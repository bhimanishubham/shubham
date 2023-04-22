require('../utils/error_code')
let fs = require('fs')
let nodemailer = require("nodemailer")

exports.check_request_params_async = function (request_data_body, params_array) {
    return new Promise((resolve, reject) => {
        let missing_param = '';
        let is_missing = false;
        let invalid_param = '';
        let is_invalid_param = false;
        if (request_data_body) {
            params_array.forEach(function (param) {
                if (request_data_body[param.name] == undefined) {
                    missing_param = param.name;
                    is_missing = true;
                } else {
                    if (typeof request_data_body[param.name] !== param.type) {
                        is_invalid_param = true;
                        invalid_param = param.name;
                    }
                }
            });
            if (is_missing) {
                resolve({ success: false, error_code: ERROR_CODE.ERROR_CODE_PARAMETER_MISSING, error_description: missing_param + ' parameter missing' });
            } else if (is_invalid_param) {
                resolve({ success: false, error_code: ERROR_CODE.ERROR_CODE_PARAMETER_INVALID, error_description: invalid_param + ' parameter invalid' });
            } else {
                resolve({ success: true });
            }
        } else {
            resolve({ success: true });
        }
    })
}

exports.tokenGenerator = function (length) {
    if (typeof length == "undefined")
        length = 32;
    let token = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    return token;
};

exports.error_response = function (err, res) {
    console.log(err);
    res.json({
        success: false,
        error_code: ERROR_CODE.ERROR_CODE_SOMETHING_WENT_WRONG
    });
}


exports.get_folder_id = function (id){
    switch (id) {
        case 1:
            value = "/course_image/"
            break;
        case 2:
            value = "/profile_image/"
            break;
        default:
            break;
    }
    return value
}

exports.saveImageFolderPath = function (id) {
    return './uploads/' + exports.get_folder_id(id);
};


exports.save_folder_image = function (path,imagename,id){
    let new_folder_path = exports.saveImageFolderPath(id) + imagename
    fs.readFile(path, function (err, data) {
        fs.writeFile(new_folder_path, data, 'binary', function (err) {
            if (err) {
            } else {
                response = {
                    message: 'File uploaded successfully'
                };
            }
        });
    });

}

exports.delete_folder_image = function (path){
    let filePate = "./uploads/" + path
    fs.unlinkSync(filePate, function (err, data) {
        console.log(err);
        response = {
            message: 'File delete successfully'
        };
    });
}

exports.send_mail = async(email,password) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "elluminatirajkot@gmail.com", // generated ethereal user
              pass: "003015@De", // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: 'elluminatirajkot@gmail.com', // sender address
            to: "testgmail.com", // list of receivers
            subject: "Forgot Password", // Subject line
            html: `<b>Your New Password Is: ${password}</b>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error)
    }
}