class FileController {
    upload(req, res, next) {
        try {
            res.send({
                status: "success",
                message: `La imagen llamada: ${req.file.originalname} uploaded! / ${req.file.originalname} ha sido subida!`
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new FileController();
