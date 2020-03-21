const uuid = require('uuid/v1');
const fs = require('fs');
const {resolve} = require('path');

const {mimeTypes} = require('../constants');
const ControllerError = require('../errors/ControllerError');

module.exports =  (picture, restaurant_id, prod_id, type) => {

    try {

        if (!picture || Array.isArray(picture)) {
            new Error('This file is not a picture');
        }

        const {name, mimetype, size} = picture;

        const checkMimeType = mimeTypes.PHOTOS.includes(mimetype);


        if (checkMimeType === false) {
           throw new Error('Photo must have correct mime-type')
        }

        if (size > 5 * 1024 * 1024 || size < 512) {
          throw  new Error('Size must be less then 5mb or bigger then 512kb')
        }
        // const successCrete = await fsp.mkdir(resolve(`${appRoot}/public/${type}/${restaurant_id}/${prod_id}`), {recursive: true});
        // console.log(successCrete);
        // if (successCrete === true) {
        //     console.log('aaaa')
        // }
        fs.mkdirSync(resolve(`${appRoot}/public/${type}/${restaurant_id}/${prod_id}`), {recursive:true});

        const pictureName = uuid() + '.' + name.split('.').pop();
        picture.path = `${type}/${restaurant_id}/${prod_id}/${pictureName}`;
        picture.name = pictureName;

        return {
            picture
        }

    } catch (e) {
        throw new ControllerError(e.message, e.status, 'helpers/fileChecker')
    }

}
