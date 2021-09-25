const {getFiles} = require('../utils/Directory');



module.exports.searchFile = async (req, res) =>{
   const {fileName} = req.query; 
   // uncomment for a post request
   // const  body = req.body;
   // console.log(body.channels);
   // const channelNames = body.channels.split(',');

   channelNames = ['goals', 'music'];

   const result = Promise.all( channelNames.map(async channel=>{
        const folderPath = `./uploads/${channel}`
        try{

            const data = await getFiles(folderPath, fileName);
            
            const channelResult = {channel: channel, data: data}

            return channelResult;
        }


         catch(error){
            return res.status(500).json({message: 'Server Error', data: null})  
        }

     })) 
    


    const output = await result;
   
  
    return res.status(200).json({message: 'success' , data: output})



    


     
    
   
}