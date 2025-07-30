import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


// check availability of car for a given date 
const checkAvailability = async(car , pickupDate , returnDate) =>{
     const bookings = await Booking.find({
          car,
          pickupDate: {$lte:returnDate},
          returnDate: {$gte:pickupDate},
     });
     return bookings.length === 0;
}

// check availability of cars for the given date and location 

export const checkAvailabilityOfCar = async (req ,res) =>{
     try{
           const {location , pickupDate , returnDate} = req.body;
          //  all available car for the location 
          const cars = await Car.find({location , isAvaliable:true});

          // car available for the given date range using promise 
          const availableCarsPromise = cars.map(async (car) =>{
             const isAvaliable = await checkAvailability(car._id , pickupDate , returnDate)
             return {...car._doc , isAvaliable : isAvaliable};
          })
          let availableCars = await Promise.all(availableCarsPromise);
          availableCars = availableCars.filter(car => car.isAvaliable === true);

          res.json({success: true , availableCars});
          
     }catch(e){
       console.log(e.message);
       res.json({success:false , message: e.message});
     }
}