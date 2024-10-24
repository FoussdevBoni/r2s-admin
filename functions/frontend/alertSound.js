import * as Speech from 'expo-speech';

// Fonction pour parler un message
export const speak = async (message, hasSpoken) => {
  Speech.speak(message);
  await hasSpoken();
};
