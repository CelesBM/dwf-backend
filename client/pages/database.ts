import { initializeApp } from "firebase/app";

const firebaseConfig = ({
    apiKey: "aqiot4vw2NhVXXzqhbcZVFhlOzlhN0hDrYH4834M", 
    databaseURL:"https://dwf-backend-default-rtdb.firebaseio.com",
    authDomain:"dwf-backend.firebaseapp.com"
    });

    const rtdb = initializeApp(firebaseConfig);

    export {rtdb}