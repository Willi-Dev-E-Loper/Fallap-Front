export function dateNow(){
    const date = new Date()
    const dia = date.getDate();
    const mes = date.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
    const anio = date.getFullYear();
    // Obtener la hora, minutos y segundos
    const horas = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();

// Formatear los valores para que tengan dos dígitos si es necesario
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes % 100;
    const horasFormateadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

// Crear la cadena de fecha en formato dd-mm-yy hh:mm:ss
    return`${diaFormateado}-${mesFormateado}-${anio.toString().substr(-2)} ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
}

export function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;

}
export function formatDateFooter(fechaString) {
    let partes = fechaString.split(' ');
    let fechaPartes = partes[0].split('-');
    let horaPartes = partes[1].split(':');

    let anio = '20' + fechaPartes[2];
    let mes = fechaPartes[1];
    let dia = fechaPartes[0];
    let horas = horaPartes[0];
    let minutos = horaPartes[1];

    let fecha = new Date(anio, mes - 1, dia, horas, minutos);

    let formatoFecha = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 'h ' +
        fecha.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });

    return formatoFecha;
}

export function parseFechaComentario(fechaComentario) {
    const parts = fechaComentario.split(" ");
    const fechaParts = parts[0].split("-");
    const horaParts = parts[1].split(":");
    const year = 2000 + parseInt(fechaParts[2]);
    const month = parseInt(fechaParts[1]) - 1;
    const day = parseInt(fechaParts[0]);
    const hour = parseInt(horaParts[0]);
    const minute = parseInt(horaParts[1]);
    const second = parseInt(horaParts[2]);
    return new Date(year, month, day, hour, minute, second);
}
export const formatearFecha= (fechaOriginal)=> {
    const [anio, mes, dia] = fechaOriginal.split('-');
    return `${dia}/${mes}`;


}