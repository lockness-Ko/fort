import bcrypt from "bcrypt";

if (process.argv[2] == undefined) {
  throw Error("Missing password argument!");
}

bcrypt.hash(process.argv[2], 10).then((x, y) => console.log(x));
