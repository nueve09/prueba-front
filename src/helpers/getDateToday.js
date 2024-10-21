// Funcion para obtener la fecha actual
export const getDateToday = () => {

  const date = new Date();
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  return `${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`;
};