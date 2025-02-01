const { exec } = require('child_process');

exec('node dev.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Error: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`❗ Error de salida estándar: ${stderr}`);
        return;
    }

    if (stdout) {
        console.log(`✅ Sin errores: ${stdout}`);
    } else {
        console.log('✅ No hubo errores durante la ejecución.');
    }
});
