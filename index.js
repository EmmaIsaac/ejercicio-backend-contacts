// 1 - preparto la lógica necesaria para tomar el input del usuario
// 2 - proceso el input del usuario y ejecuto la funcionalidad requerida
// 3 - le devuelvo el output al usuario

import { readContacts, addContact, deleteContact } from "./modules.js";

const args = process.argv.splice(2);
const URL_FILE = "./data/contacts.json";
const opcion = args[0];
const favorito = args[1];

switch (opcion) {
  case "list":
    switch (favorito){
      case "--f":
        console.log(readContacts(URL_FILE, favorito));
        break;
      default:
        console.log(readContacts(URL_FILE));
        break;
    }
    break;
  case "add":
    switch (favorito){
      case "--f":
        console.log(addContact(args[2], args[3], args[4], favorito));
        break;
      default:
        console.log(addContact(args[1], args[2], args[3]));
        break;
    }
    break;
  case "delete":
    console.log(deleteContact(args[1]));
    break;
  default:
    console.log("Elija una opcion valida: list, add o delete");
    break;
}
