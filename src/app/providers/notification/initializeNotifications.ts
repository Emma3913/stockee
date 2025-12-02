import { createNotificationChannel, listenNotifications } from "./notification";

export async function initializeNotifications() {
  console.log("Inicializando sistema de notificaciones...");

  await createNotificationChannel();
  listenNotifications();

  console.log("Sistema de notificaciones listo");
}
