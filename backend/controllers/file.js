const moment = require("moment");

class FileController {
    upload(req, res) {
        console.log("Almacenando archivo... / Storing file...", req.file);
        try {
            res.send({
                status: "success",
                message: `La magen llamada: ${req.file.originalname} uploaded! / ${req.file.originalname} ha sido subida!`
            });
        } catch (err) {
            res.send({
                status: "err",
                error: err,
                message: `An error occurred during upload. / Ocurrió un error durante la carga. ${err.message}`
            });
        }
    }
}

module.exports = new FileController();
