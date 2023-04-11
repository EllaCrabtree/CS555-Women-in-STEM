import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, addDoc,doc } from "firebase/firestore";
import * as dotenv from "dotenv";

const initDb = async () => {
  dotenv.config({ path: ".env.local" });
  const firebaseCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  };
  console.log(firebaseCredentials);
  const app = initializeApp(firebaseCredentials);
  return getFirestore(app);
};

const seedDatabase = async () => {
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
  let customer1, customer2, sales1, sales2, construction1, construction2, opManager1, opManager2, sPanel1, sPanel2,reminder1,task1, project1,subtask1,subtask2;
  /* ADDING CUSTOMERS TO DATABASE 
    NOTE: UserUUIDs were taken from firebase auth table
    Each user has their own login by username:
    Test Email Username: first_name@last_name.test
    Password: testing
 
  */
  //Add Customer1
  try {
    customer1 = await setDoc(doc(db, 'Users',"gjInJS5OX5PIVcetffPSOfVn1Mv1"), {
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
    customer2 = await setDoc(doc(db, 'Users','FsAjDBtNJiQYA91dtlGLTafWCzI2'), {
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
    sales1 = await setDoc(doc(db, 'Users','utzSyzbN8OTvGgY84BahAo3sASF3'), {
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
    sales2 = await setDoc(doc(db, 'Users','3PANXOLRNjMCDToCXWQm9BWMaZr2'), {
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
    construction1 = await setDoc(doc(db, 'Users','l3U6tFUbumgNcQkKl3e4M7kiAAx2'), {
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
    construction2 = await setDoc(doc(db, 'Users','SLkRKTne2gfZauwyXfhwJmUjhOr2'), {
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
    opManager1 = await setDoc(doc(db, 'Users','DmfzWhrdSTQEoYggod0zKICG82w2'), {
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
    opManager2 = await setDoc(doc(db, 'Users','yFJ0XZfIklY0vU5jcqs0MYGgcYk1'), {
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

  //Solar Panel 1//
  try {
    sPanel1 = await setDoc(doc(db, 'SolarPanel','1'), {
      ID:"1",
      OwnerID: "gjInJS5OX5PIVcetffPSOfVn1Mv1",
      Installation_Date: "03-09-2023",
      ProjectID: "C1Am6F4G5",
      Status:"Running"
    })
    console.log(sPanel1);
  } catch (error) {
    throw `Solar Panel 1 failed to add to database! Message: ${error}`
  }
  //Solar Panel 2//
  try {
    sPanel2 = await setDoc(doc(db, 'SolarPanel','2'), {
      ID:"2",
      OwnerID: "FsAjDBtNJiQYA91dtlGLTafWCzI2",
      Installation_Date: "04-18-2023",
      ProjectID: "Am6Dm2G5C1",
      Status:"Blocked"
    })
    console.log(sPanel2);
  } catch (error) {
    throw `Solar Panel 2 failed to add to database! Message: ${error}`
  }

  //Reminder 1//
  try {
    reminder1 = await setDoc(doc(db, 'Reminders','1'), {
      ID:"1",
      ProjectID: "Am6Dm2G5C1",
      TaskID: "PBS9531",
      Title: "Get Municipal Approval",
      Creation_Date: "04-10-2023",
      Due_Date:"04-11-2023"
    })
    console.log(reminder1);
  } catch (error) {
    throw `Reminder 1 failed to add to database! Message: ${error}`
  }
//project 1
  try {
    project1 = await setDoc(doc(db, 'Projects','Am6Dm2G5C1'), {
      ProjectID: "Am6Dm2G5C1",
      Project_Name: "Odin's Project",
      Description:"Very Cool Project",
      OwnerID:"FsAjDBtNJiQYA91dtlGLTafWCzI2",
      Sales_Team:["utzSyzbN8OTvGgY84BahAo3sASF3","3PANXOLRNjMCDToCXWQm9BWMaZr2"],
      Construction_Team:["SLkRKTne2gfZauwyXfhwJmUjhOr2","l3U6tFUbumgNcQkKl3e4M7kiAAx2"],
      Current_Stage:1,
      NumberOfStages:2,
      Tasks:["PBS9531","HJNNN0"]
    })
    console.log(project1);
  } catch (error) {
    throw `Project 1 failed to add to database! Message: ${error}`
  }
  //task 1
  try {
    task1 = await setDoc(doc(db, 'Tasks','PBS9531'), {
      TaskID:"PBS9531",
      Title:"Get Municipal Approval",
      Description:"Submit proposed plan and await the local municipal department's approval of the proejct development",
      Completion_Status:0,
      ProjectID: "Am6Dm2G5C1",
      Completion_Date:"N/A",
      Creation_Date: "04-10-2023",
      Due_Date:"04-11-2023",
      SubTasks:["MTF0107","WIN0805"]
    })
    console.log(task1);
  } catch (error) {
    throw `Task1 1 failed to add to database! Message: ${error}`
  }
//subtask 1
try {
  subtask1 = await setDoc(doc(db, "Subtasks","MTF0107"), {
    SubTaskID:"MTF0107",
    Title:"Submit Documents",
    Description:"Submit documents for approval",
    Completion_Status:0,
    Creation_Date: "04-10-2023"
  })
  console.log(subtask1);
} catch (error) {
  throw `Subtask1 1 failed to add to database! Message: ${error}`
}

//subtask 2
try {
  subtask2 = await setDoc(doc(db, 'Subtasks','WIN0805'), {
    SubTaskID:"WIN0805",
    Title:"Municipal Body Returns Verdict",
    Description:"Await the decision",
    Completion_Status:0,
    Creation_Date: "04-10-2023"
  })
  console.log(subtask2);
} catch (error) {
  throw `Subtask 2  failed to add to database! Message: ${error}`
}

  //     try{
  //     const docRef = await setDoc(doc(db,"Users",6969696969699669), {
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