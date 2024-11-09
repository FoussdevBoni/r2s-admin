import { onValue, push, ref, set } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";
export function sendNotifications(notification) {
    const allNotificationRef = ref(db, `notifications/${notification?.receiverId}`)

 return    push(allNotificationRef , notification)
}

function getNotifications(receiverId) {
    const allNotificationRef = ref(db, `notifications/${receiverId}`)

    onValue(allNotificationRef , (sn)=>{
        const data = sn.val()
        if (data) {
            return data
        }
    })

}