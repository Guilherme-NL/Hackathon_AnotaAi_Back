import { MongoClient, ObjectId } from "mongodb";
import { registrationDataSchema } from "../schemas/authSchemas.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient("mongodb://localhost:27017");
let db;

mongoClient.connect(() => {
  db = mongoClient.db("AnotaAI");
  console.log("mongo is connected");
});


export async function createNewUser(registrationData) {
  let { name, email, password } = registrationData;
  let newUser = {
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
  };
  let promisse = await db.collection("users").insertOne(newUser);
  let isCreated = promisse.acknowledged;
  if (isCreated) {
    return true;
  } else {
    return false;
  }
}

export async function validateRegistrationData(registrationData) {
  let isValid;
  let validationResult =
    registrationDataSchema.validate(registrationData).error === undefined;
  if (validationResult) {
    if (registrationData.password === registrationData.confirmedPassword) {
      let { name, email } = registrationData;
      if (
        (await checkNameExistence(name)) &&
        (await checkEmailExistence(email))
      ) {
        isValid = true;
        return isValid;
      } else {
        console.log(
          "Já existe um usuário cadastrado que possui o mesmo nome ou o mesmo e-mail"
        );
        isValid = false;
        return isValid;
      }
    } else {
      console.log("As senhas não coincidem");
      isValid = false;
      return isValid;
    }
  } else {
    let schemaError = registrationDataSchema.validate(registrationData).error;
    console.log(
      "Ocorreu um erro na validação",
      schemaError
    );
    isValid = false;
    return isValid;
  }
}


async function checkEmailExistence(wantedEmail) {
  let users = await db.collection("users").find().toArray();
  let isEmailValid;
  if (users.find((user) => user.email === wantedEmail) === undefined) {
    isEmailValid = true;
    return isEmailValid;
  } else {
    isEmailValid = false;
    return isEmailValid;
  }
}

async function checkNameExistence(wantedName) {
  let users = await db.collection("users").find().toArray();
  let isNameValid;
  if (users.find((user) => user.name === wantedName) === undefined) {
    isNameValid = true;
    return isNameValid;
  } else {
    isNameValid = false;
    return isNameValid;
  }
}

export async function createUserSession(userData, userToken) {
  let { email, password } = userData;
  let user = {
    token: userToken,
    email: email,
    password: password,
  };
  let userHasAActiveSession = await checkIfUserHasAActiveSession(user.email);
  let isCreated;
  if (!userHasAActiveSession) {
    let promisse = await db.collection("sessions").insertOne(user);
    if (promisse.acknowledged) {
      isCreated = true;
      return isCreated; 
    } else {
      isCreated = false;
      return isCreated; 
    }
  } else {
    isCreated = false;
    return isCreated; 
  }
}

async function checkIfUserHasAActiveSession(userEmail) {
  let promisse = await db.collection("sessions").findOne({ email: userEmail });
  let userHasAActiveSession;
  if (promisse === null) {
    userHasAActiveSession = false;
    return userHasAActiveSession;
  } else {
    userHasAActiveSession = true;
    return userHasAActiveSession;
  }
}

export async function getUserName(user) {
  let wantedUser = await db.collection("users").findOne({ email: user.email });
  let userName = wantedUser.name;
  return userName;
}

export async function sendLogOutRequisition(token){
  let isUserLoggedOut;
  try{
    await db.collection("sessions").deleteOne({ token: token });
    isUserLoggedOut = true;
    return isUserLoggedOut;
  }catch(error){
    isUserLoggedOut = false;
    return isUserLoggedOut;
  }
}

export async function verifyUserExistence(user) {
  const wantedUser = await db
    .collection("users")
    .findOne({ email: user.email });

  let userExists;

  if (wantedUser != null) {
    const userEmailExists = await wantedUser.email;
    const wantedUserPassword = await wantedUser.password;
    const isPasswordEqual = bcrypt.compareSync(
      user.password,
      wantedUserPassword
    );

    if (userEmailExists === null) {
      userExists = false;
      return userExists;
    } else {
      if (isPasswordEqual) {
        userExists = true;
        return userExists;
      }
    }
  } else {
    userExists = false;
    return userExists;
  }
}

export { db, ObjectId };
