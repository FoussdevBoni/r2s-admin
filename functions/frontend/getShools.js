import axios from 'axios';
import { getSchools } from './../utils/api';

export async function getSchoolsFromAdmins() {
    try {
        const response = await axios.get(getSchools);
        const schoolsData = response.data;

        if (schoolsData) {
            return schoolsData;
        } else {
            throw new Error("Impossible de récupérer les données des administrateurs.");
        }
    } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des écoles:", error);
        throw error;
    }
}
