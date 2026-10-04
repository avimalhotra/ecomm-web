import app from "./app.js";
import os from "node:os";
import cluster from "node:cluster";


const port=process.env.PORT || 8080;

// if (cluster.isPrimary) {
//   const cpuCount = os.cpus().length;

//   for (let i = 0; i < cpuCount; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker) => {
//     console.log(`Worker ${worker.process.pid} crashed. Restarting...`);
//     cluster.fork();
//   });

// }
// else {

// app.listen(port,()=>{
//      console.log(`App running at http://127.0.0.1:${port}`)}
// );

// }



app.listen(port,()=>{
     console.log(`App running at http://127.0.0.1:${port}`)}
);

