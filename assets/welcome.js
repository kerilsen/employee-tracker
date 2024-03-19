const welcome = () => {

   const logo = `
 ______                 _                       
|  ____|               | |                      
| |__   _ __ ___  _ __ | | ___  _   _  ___  ___ 
|  __| | '_ \\ _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\
| |____| | | | | | |_) | | (_) | |_| |  __/  __/
|______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|
|__   __|        | || |          __/ |          
   | |_ __ __ _  |_|| | _____ _ |___/           
   | | '__/ _\\ |/ __| |/ / _ \\ '__|             
   | | | | (_| | (__|   <  __/ |                
   |_|_|  \\__,_|\\___|_|\\_\\___|_|                
`;

   // Display logo and welcome message
   console.log(`\x1b[36m`, logo);
   console.log(`Welcome to Central Public Library System`);
}

module.exports = welcome;