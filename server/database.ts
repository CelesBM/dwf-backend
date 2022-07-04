//para usar el servicio firestore:
import * as admin  from "firebase-admin";

//importo la llave privada que generé en firestore:
const serviceAccount = require ("./key.json")

//inicializo:
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://dwf-backend-default-rtdb.firebaseio.com"
});

const firestoreDataBase = admin.firestore();
const realtimeDataBase  = admin.database();

export{firestoreDataBase  , realtimeDataBase } ;