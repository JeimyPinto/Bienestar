const chalk = require("chalk");

async function verifyRecaptcha(token) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secret) {
        console.error(chalk.red.bold("❌ RECAPTCHA_SECRET_KEY no definida en .env"));
        return { success: false, message: "Secret key missing" };
    }

    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secret}&response=${token}`,
        });

        const data = await response.json();
        
        if (!data.success) {
            console.warn(chalk.yellow("⚠️ Falló verificación de reCAPTCHA:"), data["error-codes"]);
        } else {
            console.log(chalk.green("✅ reCAPTCHA verificado exitosamente"));
        }
        
        return data;
    } catch (error) {
        console.error(chalk.red("❌ Error en la llamada a Google reCAPTCHA:"), error.message);
        return { success: false, error: error.message };
    }
}

module.exports = { verifyRecaptcha };
