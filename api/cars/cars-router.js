// DO YOUR MAGIC
const express = require('express')
const router = express.Router()
const model = require('./cars-model')
// const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require('./cars-middleware')
//model functions
    //getAll
    //getById
    //create
//Grab all Cars
router.get("/" ,async (req,res,next)=>{
    try{
        const cars = await model.getAll();
        res.status(200).json(cars)
    }catch(err){
        next(err)
    }
})
//Grab Car by ID
router.get("/:id" , async (req,res,next)=>{
    try{
        const specifiedCar = await model.getById(req.params.id)
        res.status(200).json(specifiedCar)
    }catch(err){
        next(err)
    }
})
//Post New Car
router.post("/" , async (req,res,next)=>{
    try{
        const newCar = await model.create(req.params.id, req.body);
        res.status(200).json(newCar)
    }catch(err){
        next(err)
    }
})


module.exports = router;
