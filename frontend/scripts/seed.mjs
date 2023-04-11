import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc ,setDoc} from "firebase/firestore";
import * as dotenv from "dotenv";
const firebaseCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};
const initDb = async () => {
    const app = initializeApp(firebaseCredentials);
    return getFirestore(app);
};
const seedDatabase = async () => {
    dotenv.config(".env.local");
    /* 
      Database Seed File:
      Users (8):
        Customers (2): Customer1, Customer2
        Sales (2): Sales1, Sales2
        Construction (2): Construction1, Construction2
        Operations Managers (2): OpManager1, OpManager2
    
      Solar Panels (3):
        - SolarPanel1: owned by Customer1
        - SolarPanel2: owned by Customer1
        - SolarPanel3: owned by Customer2
      5 Projects:
        3 Completed Projects (associated with 3 Solar Panels)
        - 2 Projects at different stages
    */
    const db = await initDb();
    let customer1, customer2, sales1, sales2, construction1, construction2, opManager1, opManager2;
    /* ADDING CUSTOMERS TO DATABASE 
      NOTE: UserUUIDs were taken from firebase auth table
      Each user has their own login by username:
      Test Email Username: first_name@last_name.test
      Password: testing
  
    */
    //Add Customer1
    try {
      customer1 = await addDoc(collection(db, 'Users'), {
        UserUUID: "gjInJS5OX5PIVcetffPSOfVn1Mv1",
        first_name: "Ella",
        last_name: "Crabtree",
        userType: "Customer",
        Reminders: []
      })
      console.log(customer1);
    } catch (error) {
      throw `Customer 1 failed to add to database! Message: ${error}`
    }
    //Add Customer2
    try {
      customer2 = await addDoc(collection(db, 'Users'), {
        UserUUID: "FsAjDBtNJiQYA91dtlGLTafWCzI2",
        first_name: "Odin",
        last_name: "Crabtree",
        userType: "Customer",
        Reminders: []
      })
      console.log(customer2);
    } catch (error) {
      throw `Customer 2 failed to add to database! Message: ${error}`
    }
    //Add Sales 1
    try {
      sales1 = await addDoc(collection(db, 'Users'), {
        UserUUID: "utzSyzbN8OTvGgY84BahAo3sASF3",
        first_name: "Nikhil",
        last_name: "Shah",
        userType: "Sales",
        Reminders: []
      })
      console.log(sales1);
    } catch (error) {
      throw `Sales 1 failed to add to database! Message: ${error}`
    }
    //Add Sales 2
    try {
      sales2 = await addDoc(collection(db, 'Users'), {
        UserUUID: "3PANXOLRNjMCDToCXWQm9BWMaZr2",
        first_name: "Ari",
        last_name: "Birnbaum",
        userType: "Sales",
        Reminders: []
      })
      console.log(sales2);
    } catch (error) {
      throw `Sales 2 failed to add to database! Message: ${error}`
    }
    //Add Construction 1
    try {
      construction1 = await addDoc(collection(db, 'Users'), {
        UserUUID: "l3U6tFUbumgNcQkKl3e4M7kiAAx2",
        first_name: "Joe",
        last_name: "Vasallo",
        userType: "Construction",
        Reminders: []
      })
      console.log(construction1);
    } catch (error) {
      throw `Construction 1 failed to add to database! Message: ${error}`
    }
    //Add Construction 1
    try {
      construction2 = await addDoc(collection(db, 'Users'), {
        UserUUID: "SLkRKTne2gfZauwyXfhwJmUjhOr2",
        first_name: "David",
        last_name: "Cruz",
        userType: "Construction",
        Reminders: []
      })
      console.log(construction2);
    } catch (error) {
      throw `Construction 2 failed to add to database! Message: ${error}`
    }
    //Add Operations Manager 1
    try {
      opManager1 = await addDoc(collection(db, 'Users'), {
        UserUUID: "DmfzWhrdSTQEoYggod0zKICG82w2",
        first_name: "Facundo",
        last_name: "Rechter",
        userType: "Operations",
        Reminders: []
      })
      console.log(opManager1);
    } catch (error) {
      throw `Operations Manager 1 failed to add to database! Message: ${error}`
    }
    //Add Operations Manager 2
    try {
      opManager2 = await addDoc(collection(db, 'Users'), {
        UserUUID: "yFJ0XZfIklY0vU5jcqs0MYGgcYk1",
        first_name: "Stephanie",
        last_name: "Martinez",
        userType: "Operations",
        Reminders: []
      })
      console.log(opManager2);
    } catch (error) {
      throw `Operations Manager 2 failed to add to database! Message: ${error}`
    }
    /* ADDING SOLAR PROJECTS TO DATABASE */
    
//     try{
//     const docRef = await setDoc(collection(db,"Users",6969696969699669), {
//         UserUUID: 6969696969699669,
//         userType: "Client",
//         first_name: "Clienty",
//         last_name: "Clientface"
//   });
// } catch(e){
//   console.error("Big oopsie: ",e)
// }
};
export default seedDatabase();