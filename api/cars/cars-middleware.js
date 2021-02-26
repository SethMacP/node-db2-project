const model = require('./cars-model');
var vinValidator = require('vin-validator');
const dbConfig = require('../../data/db-config');

const checkCarId =()=> async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const idCheck = await model.getById(req.params.id);
      if(idCheck){
        next();
      }else{
        res.status(404).json({message:`Car with ID: ${req.params.id} does not exist.`})
      }
  }catch(err){
    next(err)
  }


}

const checkCarPayload = () => async (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage){
    return res.status(400).json({message:"Missing a required field"})
  }
  next();
}

const checkVinNumberValid = () => async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    var isValidVin = vinValidator.validate(req.body.vin); // true
    if(isValidVin === true){
      next()
    }else{
      res.status(400).json({message:"Vin is invalid"})
    }
}catch(err){
  next(err);
}
}

const checkVinNumberUnique = () => async  (req, res, next) => {
  // DO YOUR MAGIC
  const allCars = await model.getAll();
  const vinCheck = allCars.filter(car=> car.vin === req.body.vin)
  if(vinCheck[0].vin ===req.body.vin){
    return res.status(400).json({message:"VIN is NOT unique"})
  }else{
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}