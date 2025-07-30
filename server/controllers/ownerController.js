import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from 'fs'


// change role user 
export const changeRoleToOwner = async (req , res) =>{
     try{
          const {_id} = req.user;
          await User.findByIdAndUpdate(_id , {role:"owner"});
          res.json({success:true , message:"You can list cars"})
     }catch(e){
          console.log(e.message)
         res.json({success:false , message:e.message});
     }
}

// list car 

export const addCar = async(req , res) =>{
     try{
         const {_id} = req.user;
         let car = JSON.parse(req.body.carData);
         const imageFile = req.file;

         const fileBuffer = fs.readFileSync(imageFile.path)
         const response = await imagekit.upload({
          file:fileBuffer,
          fileName : imageFile.originalname,
          folder: '/cars'
         })
     
         var optimizedImageUrl = imagekit.url({
            path:response.filePath,
            transformation:[
               {width:'1280'},
               {quality:'auto'},
               {format:'webp'}
            ]
         });

         const image = optimizedImageUrl;
         await Car.create({...car , owner: _id , image});
         res.json({success:true , message:"car added"});


     }catch(e){
          console.log(e.message);
          res.json({success:false , message:e.message});
     }
}