import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, './uploads/images/')
        }
        else if (file.fieldname === "video") {
            cb(null, './uploads/videos/');
        }
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        if (file.fieldname === "image") {
            cb(null, `${file.originalname}`);
        }
        else if (file.fieldname === "video") {
            cb(null, `${file.originalname}`);
        }
    }
});


const allowedImgTypes = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'];
const allowedVideoTypes = ['video/mp4'];

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "image" && !allowedImgTypes.includes(file.mimetype)) {
        cb(new Error('Invalid image file'), false);
    }
    if (file.fieldname === "video" && !allowedVideoTypes.includes(file.mimetype)) {
        cb(new Error('Invalid video file'), false);
    }

    cb(null, true);
};

const uploader = multer(
    {
        storage: storage,
        fileFilter: fileFilter
    }
).fields(
    [
        {
            name: 'image',
            maxCount: 1
        },
        {
            name: 'video',
            maxCount: 1
        }
    ]
);

const fileUploader = (req, res) => {
    uploader(req, res, (err) => {
        if(err) {
            return res.json({success: false, message: err.message});
        }

        return res.json({success: true});
    });
};

export default fileUploader;