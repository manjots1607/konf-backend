const Axios = require("axios");

Axios.get("https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences")
.then(function(res){
    const confMap= new Map();
    const exactDuplicates = []; 

    if(!res.data.errorMessage){
        res.data.paid.forEach(conf => {
            if(!confMap.has(conf.conference_id)){
                confMap[conf.conference_id]=1;
            }else{
                confMap[conf.conference_id]++;
                exactDuplicates.push(conf);
            }

            console.log("-----------------------------------------------------------------------------------------");
            
            console.log(); // Extra line
            console.log(`"${conf.confName}" - ${conf.confStartDate}, ${conf.city}, ${conf.state}, ${conf.country}, PAID  `);
            console.log(` URL: ${conf.confUrl} `) 
            console.log(); // Extra line
        });
        res.data.free.forEach(conf => {
            if(!confMap.has(conf.conference_id)){
                confMap[conf.conference_id]=1;
            }else{
                exactDuplicates.push(conf);
            }

            console.log("-----------------------------------------------------------------------------------------");
            
            console.log(); // Extra line
            console.log(`"${conf.confName}" - ${conf.confStartDate}, ${conf.city}, ${conf.state}, ${conf.country}, FREE  `);
            console.log(` URL: ${conf.confUrl} `) 
            console.log(); // Extra line
        });

        if(exactDuplicates.length>0){
            console.log("==============================================================================================");
            console.log(" EXACT DUPLICATES        ");
            console.log("==============================================================================================");

            exactDuplicates.forEach(function(conf){
                console.log(); // Extra line
                console.log(`"${conf.confName}" - ${conf.confStartDate}, ${conf.city}, ${conf.state}, ${conf.country}, FREE  `);
                console.log(` URL: ${conf.confUrl} `);
                console.log(`DUPLICATES: ${confMap[conf.conference_id]}`); 
                console.log(); // Extra line

                console.log("-----------------------------------------------------------------------------------------");

            })
        }



    }else{
        console.error(res.data.errorMessage);
    }

})
.catch(function(err){
    console.log(err);
});