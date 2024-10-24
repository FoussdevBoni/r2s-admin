import { onValue, ref } from "firebase/database"
import { speak } from "./alertSound"
// pushNotificationHandler.js
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { database } from "../../firebase/firebaseConfig";

export async function displayPushNotification(notification) {

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title ?? 'R2S',
        body: notification.message ?? 'Notification R2S',
        data: notification.data ?? {},
      },
      trigger: null, // notification immédiate
    });
  } catch (error) {
    console.error('Failed to display push notification:', error);
  }
}


export function getnotifications(user , setNotifications) {
  const path = user.id ? 'notifications/'+user.id: 'notifications/'+user._id
 const notificationsRef = ref(database, path)

    onValue(notificationsRef , (sn)=>{
      const data = sn.val()
      if (data) {
        const dataArray = Object.entries(data).map(([key , value])=>({
          ...value,
          id: key
        }))
        const filtered = dataArray.filter(item=>(item.read===undefined||item.read===false))
        console.log(data)
        filtered.forEach((item)=>{
          speak(item.message)
          displayPushNotification(item)
        })

       
        setNotifications(filtered)
      }
    })}

