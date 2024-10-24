import { DateTime } from "luxon";
export const setHourNow = () => {
  // Obtiene la fecha actual
  const fecha = DateTime.now();

  const zone= 'America/Mexico_City';
    const fechaConZona = fecha.setZone(zone);
  
  // Establece la configuración regional a español
  const fechaEnEspañol = 
  fechaConZona
    .setLocale('es');

  const formatoCompleto = fechaEnEspañol.toFormat('cccc, dd LLLL yyyy');


    return formatoCompleto;

    
}