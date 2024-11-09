import { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const notifications = [
  {
    id: 0,
    title: 'Heure de départ !',
    body: 'Il est temps de partir pour l\'école.',
     date: '10/21/2023'
  },
  {
    id: 1,
    title: 'Alerte maladie !',
    body: 'Un élève est malade, veuillez prendre des dispositions.',
     date: '10/21/2023'
  },
  {
        id: 2,
    title: 'Retard exceptionnel !',
    body: 'Le trajet risque d\'être retardé en raison de travaux routiers.',
     date: '10/21/2023'
  },
  {
    id: 3,
    title: 'Heure de départ !',
    body: 'Il est temps de partir pour l\'école.',
     date: '10/21/2023'
  },
  {
    id: 4,
    title: 'Alerte maladie !',
    body: 'Un élève est malade, veuillez prendre des dispositions.',
     date: '10/21/2023'
  },
  {
    id: 5,
    title: 'Retard exceptionnel !',
    body: 'Le trajet risque d\'être retardé en raison de travaux routiers.',
     date: '10/21/2023'
  },
  // ... Ajoutez d'autres notifications selon vos besoins
];


function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification(expoPushToken, notification) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: notification.title,
    body: notification.body,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId:       Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

export default function PushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');

  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Received notification:', notification);
      // Vous pouvez ajouter votre logique pour gérer les notifications reçues ici
    });

    const interval = setInterval(() => {
      if (expoPushToken) {
        const randomNotification = getRandomElement(notifications);
        sendPushNotification(expoPushToken, randomNotification);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, [expoPushToken]);
  console.log(expoPushToken)
  return null
}
