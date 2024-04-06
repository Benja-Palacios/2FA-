import Swal from "sweetalert2";
import axios from "axios";
export function errorAPI(mensaje,text, icono) {
    Swal.fire({
        icon: icono,
        title: mensaje,
        text: text,
      });
}

export function show_alerta(mensaje, qrBase64, userName) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: mensaje,
            html: `<div><img src="data:image/png;base64,${qrBase64}" style="max-width: 100%; height: auto;"></div>`,
            input: "text",
            timer: 120000,
            timerProgressBar: true,
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            showLoaderOnConfirm: true,
            preConfirm: async (code) => {
                try {
                    const response = await axios.post(`http://localhost:8083/api/qrcode/validate/${userName}`, {
                        totpKey: code
                    });
            
                    if (!response.data) {
                        throw new Error('Invalid code');
                    }
            
                    return response.data;
                } catch (error) {
                    if (error.response && error.response.status === 500) {
                        Swal.showValidationMessage('Codigo Invalido'); 
                    } else {
                        Swal.showValidationMessage(error.message);
                    }
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true); 
            } else {
                resolve(false); 
            }
        }).catch(() => {
            reject(new Error('Error en la alerta'));
        });
    });
}
