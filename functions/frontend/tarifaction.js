// Constantes
const TARIF_BASE_PAR_TRAJET = 600; // FCFA
const DISTANCE_MOYENNE = 7; // km
const TAUX_AUGMENTATION = 0.20; // 20%
const TARIF_JOURNALIER = 1200; // FCFA

/**
 * Fonction pour calculer le tarif basé sur la distance et le nombre de places
 * @param {string} serviceType - Le type de service ('Minicom' ou 'Privé')
 * @param {number} distance - La distance parcourue en km
 * @param {number} [places=1] - Le nombre de places occupées dans le véhicule (applicable pour Minicom)
 * @returns {object} - Un objet contenant le tarif final par trajet et le tarif total pour toutes les places (ou une place pour Privé)
 */
export function calculerTarif(serviceType, distance, places = 1) {
    // Vérification des paramètres
    if (distance <= 0 || (serviceType === 'Minicom' && (places <= 0 || places > 5))) {
        throw new Error("Veuillez entrer des valeurs valides pour la distance et le nombre de places.");
    }

    let tarifFinal;

    if (distance < DISTANCE_MOYENNE) {
        // Calcul pour une distance inférieure à la distance moyenne
        let tarifReel = (distance / DISTANCE_MOYENNE) * TARIF_JOURNALIER;
        let ecart = tarifReel - TARIF_BASE_PAR_TRAJET;
        let augmentation = ecart * TAUX_AUGMENTATION;
        tarifFinal = tarifReel + augmentation;
    } else {
        // Pour une distance égale ou supérieure à la distance moyenne, on utilise le tarif de base
        tarifFinal = TARIF_BASE_PAR_TRAJET;
    }

    if (serviceType === 'Minicom') {
        let tarifTotal = tarifFinal * places;
        return {
            serviceType: 'Minicom',
            tarifParTrajet: tarifFinal,
            tarifTotal: tarifTotal
        };
    } else if (serviceType === 'Privé') {
        return {
            serviceType: 'Privé',
            tarifParTrajet: tarifFinal
        };
    } else {
        throw new Error("Type de service invalide. Les types valides sont 'Minicom' et 'Privé'.");
    }
}
