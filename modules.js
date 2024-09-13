// 1 - defino que funcionalidades tendrá el usuario y las convierto a módulos
// 2 - desarrollo las funcionalidades y manipulo la data
// 3 - pienso lo que retorno en cada caso (sea de éxito o no)

// importando el módulo entero
// import fs from "node:fs";
// import crypto from "node:crypto";

// importando las funcionalidades especificas del módulo (mediante destructuring)
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
const URL_FILE = "./data/contacts.json";

//LEER - list
const readContacts = (url, fav) => {
  const exist = existsSync(url);

  if (!exist) {
    writeFileSync(url, JSON.stringify([]));
    return [];
  }
  const data = readFileSync(url);
  
  if (!fav) {
    return JSON.parse(data);    

  }else{
    const dataFav = JSON.parse(data).filter(data => data.favorito === true);      
    return dataFav;
  }


};

//AGREGAR - add
const addContact = (name, tel, email, fav) => {
  if (!name) {
    return "Name is required";
  }
  if (!tel) {
    return "Telephone is required";
  }
  if (!email) {
    return "Email is required";
  }
  
  const contacts = readContacts(URL_FILE);

  // foundTask -> {} || undefined
  const foundContact = contacts.find(
    (con) => con.nombre.toLowerCase() === name.toLowerCase()
  );

  if (foundContact) {
    return "Contact already exists";
  }

  const favorito = fav ? true : false;

  const contact = {
    id: randomUUID(),
    nombre: name,
    telefono: Number(tel),
    email: email,
    favorito: favorito,
  };


  contacts.push(contact);

  writeFileSync(URL_FILE, JSON.stringify(contacts));

  return contact;
};

//ELIMINAR - delete
const deleteContact = (id) => {
  if (!id) {
    return "ID is required";
  }

  const contacts = readContacts(URL_FILE);

  const foundContact = contacts.find((cont) => cont.id === id);

  if (!foundContact) {
    return "Contact not found";
  }

  const newContacts = contacts.filter((cont) => cont.id !== id);

  writeFileSync(URL_FILE, JSON.stringify(newContacts));

  return foundContact;
};

export { readContacts, addContact, deleteContact };
