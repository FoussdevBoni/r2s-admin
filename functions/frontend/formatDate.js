 function formaterDate(date) {
  // Vérifier si la valeur passée est une instance de Date
  if (!(date instanceof Date)) {
    return "Veuillez fournir un objet Date valide";
  }

  // Obtenir les composants de la date
  var jour = date.getDate();
  var mois = date.getMonth() + 1; // Les mois commencent à partir de zéro
  var annee = date.getFullYear();
  var heures = date.getHours();
  var minutes = date.getMinutes();

  // Ajouter un zéro devant les chiffres simples (1 à 9)
  jour = jour < 10 ? '0' + jour : jour;
  mois = mois < 10 ? '0' + mois : mois;
  heures = heures < 10 ? '0' + heures : heures;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Formater la date selon le modèle "dd/mm/yyyy, HH:mm"
  var dateFormatee = jour + '/' + mois + '/' + annee + ' , ' + heures + ':' + minutes;

  return dateFormatee;
}

// Exemple d'utilisation
var maDate = new Date(); // Utilisez votre objet Date ou obtenez-le autrement
var dateFormatee = formaterDate(maDate);
console.log(dateFormatee);


export default function formaterDateISO8601(chaineDateISO8601) {
  var date = new Date(chaineDateISO8601);
  return formaterDate(date);
}



 const formatdate = (date)=>{
  // Obtenir les composants de la date
  var jour = date.getDate();
  var mois = date.getMonth() + 1; // Les mois commencent à partir de zéro
  var annee = date.getFullYear();
  var heures = date.getHours();
  var minutes = date.getMinutes();

  // Ajouter un zéro devant les chiffres simples (1 à 9)
  jour = jour < 10 ? '0' + jour : jour;
  mois = mois < 10 ? '0' + mois : mois;
  heures = heures < 10 ? '0' + heures : heures;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Formater la date selon le modèle "dd/mm/yyyy, HH:mm"
  var dateFormatee = jour + '/' + mois + '/' + annee 
  return dateFormatee;
}


export const dateISO8601 = (chaineDateISO8601)=>{
  var date = new Date(chaineDateISO8601);
  return formatdate(date);
}


export const  getDaysDiff = (date)=>{
  const date1 = new Date(date);
const newDate = new Date().toISOString(); 
const parsedDate2 = new Date(newDate);
const timeDiff = Math.abs(parsedDate2.getTime() - date1.getTime());
const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

return daysDiff
}