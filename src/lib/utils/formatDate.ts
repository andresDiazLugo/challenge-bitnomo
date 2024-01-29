import { format,parseISO,differenceInSeconds,getHours,getMinutes,getSeconds  } from 'date-fns';
export function setterDate(date:string,type:"DATE" | "HOUR"){
    if(type == "DATE"){
      const dateObject = new Date(date);
      const setterDate = format(dateObject, "dd/MM/yyyy HH:mm");
      return setterDate;
    }
    if(type == "HOUR"){
     
        // Convertir la cadena de fecha a un objeto Date
        const fechaExpiracionDate = parseISO(date);

        // Obtener la diferencia en segundos entre la fecha de expiración y la fecha actual
        const segundosRestantes = differenceInSeconds(fechaExpiracionDate, new Date());

        // Calcular los minutos y segundos
        const minutosRestantes = Math.floor(segundosRestantes / 60);
        const segundosRestantesEnMinutos = segundosRestantes % 60;

        // Formatear los minutos y segundos en el formato deseado (MM:ss)
        const tiempoRestanteFormateado = format(new Date(0, 0, 0, 0, minutosRestantes, segundosRestantesEnMinutos), 'mm:ss');

        return tiempoRestanteFormateado;
    }
    return '';
  }