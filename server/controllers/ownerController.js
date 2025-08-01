
import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from 'fs'
import Booking from "../models/Booking.js";


// change role user 
export const changeRoleToOwner = async (req , res) =>{
     try{
          const {_id} = req.user;
          await User.findByIdAndUpdate(_id , {role:"owner"});
          res.json({success:true , message:"You can able to  add own cars"})
     }catch(e){
          console.log(e.message)
         res.json({success:false , message:'Role changed failed'});
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
          res.json({success:false , message:"Add list cars failed"});
     }
}

// owner car list 
export const getOwnerCars = async (req ,res) =>{
     try{
          const {_id} = req.user;
          const cars = await Car.find({owner: _id});
          res.json({success : true , cars});
     }catch(e){
          console.log(e.message);
          res.json({success:false , message:"Owner cars listed failed"});
     }
}

// toggle car availability 
export const toggleCarAvailability = async (req , res) =>{
      try{
          const {_id} = req.user;
          const {carId} = req.body
          const car = await Car.findById(carId);
          if(car.owner.toString() !== _id.toString()){
               return res.json({success:false , message:"Unauthorized"});
          }
          car.isAvaliable= !car.isAvaliable;
          await car.save();
          res.json({success : true , message:"Availability toggled"});
     }catch(e){
          console.log(e.message);
          res.json({success:false , message:"toggle car available failed"});
     }
}

// owner delete the car
export const deleteCar = async (req , res) =>{
      try{
          const {_id} = req.user;
          const {carId} = req.body
          const car = await Car.findById(carId);
          if(car.owner.toString() !== _id.toString()){
               return res.json({success:false , message:"Unauthorized"});
          }
          car.owner =null;
          car.isAvaliable = false;
          await car.save();

          res.json({success : true , message:"Car removed"});
     }catch(e){
          console.log(e.message);
          res.json({success:false , message:"delete failed"});
     }
}

// get dashboad data 

export const getDashboardData = async(req , res) =>{
     try{
          const {_id , role} = req.user;
          if(role !== 'owner'){
               return res.json({success : false, message:"Unauthrized"});
          }

          const cars = await Car.find ({owner : _id});
          const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt:-1});

          const pendingBookings = await Booking.find({owner: _id , status: "pending"});
          const completeBookings = await Booking.find({owner: _id , status: "confirmed"});

          const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc , booking) => acc +booking.price,0);

          const dashboadData = {
               totalCars : cars.length,
               totalBookings:bookings.length,
               pendingBookings:pendingBookings.length,
               completeBookings:completeBookings.length,
               recentBooking:bookings.slice(0,3),
               monthlyRevenue
          }
          res.json({success:true , dashboadData});

     }catch(e){
         console.log(e.message);
         res.json({success:false , message: "Dashboad failed"});
     }
}

//api to update user image

export const updateUserImage = async(req , res)=>{
     try{
        const {_id} = req.user;
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response =await imagekit.upload({
          file:fileBuffer,
          fileName : imageFile.originalname,
          folder: '/users'
        });
        
        var optimizedImageUrl = imagekit.url({
          path:response.filePath,
          transformation:[
               {width:'400'},
               {quality:'auto'},
               {format:'webp'}
          ]
        })

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id , {image});
        res.json({success:true , message:"Image updated"})

     }catch(e){
        console.log(e.message);
        res.json({success:flase , message:"Profile image error"})
     }
}