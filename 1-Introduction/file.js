// 📌 writeFile (Asynchronous)
// Non-blocking: It runs in the background.
// Uses a callback to know when writing is done.

// 📌 writeFileSync (Synchronous)
// Blocking: It stops everything else until the file is written.
// No callback is needed.

const fs = require("fs");
const users = require("./userData");
// console.log('users are',users);

//writeFileSync (Synchronous)
// fs.writeFileSync("file1.txt", "This is synchronous write file..");
// console.log("file1 successfully write file");

// writeFile (Asynchronous)
fs.writeFile("file2.txt", "This is Asynchronous write file..", (err) => {
  if (err) console.log("Error occur while write file:", err);
  else console.log("File2 Write successfully..");
});

fs.writeFile("file3.json", JSON.stringify(users, null, 2), (err) => {//js Object convert to json
  if (err) console.log("error occur..", err);
  else console.log("file4 write successfully...");
});

//.............................................................................................//

//readFile(Synchronous)
// const result1 = fs.readFileSync("file1.txt", "utf-8");
// console.log("file1 read:result=", result1);

//readFile(Asynchronous)
fs.readFile("./file2.txt", "utf-8", (err, result) => {
  if (err) console.log("error occur", err);
  else console.log("file2 read:result=", result);
});

fs.readFile('./file3.json','utf-8',(err,result)=>{
  if(err)console.log('error occur..',err);
  else console.log('file3 read=',JSON.parse(result));//convert json format to js Object
})

//......................................................................................................//
// fs.appendFileSync('./file1.txt','data append\n');

// fs.appendFile('./file2.txt','data append\n',(err)=>{
// if(err)console.log('err:',err);
// else console.log('data append..');
// })

//array of an object not a append file .first of all read then push and write ...................imp


//.............................................................................................................//
// fs.unlinkSync('./file4.json') //delete file4
// fs.unlink('./file4.json',(err)=>{
//   if(err)console.log('err:',err);
//   else console.log("delete file successfully..");
// })