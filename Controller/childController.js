//===================================
//incrept password
// Import necessary modules
const express = require("express");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Child = require("./../Modal/childSchema");
const teacherSchema = require("../Modal/teacherSchema");
require("dotenv").config();

//===================================
//getAllDate



exports.getAllChild=(request,response,next)=>{
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if(request.role=="admin"||request.role=="teacher"){
        Child.find({}).populate({ path: "teacherId" ,model:teacherSchema})
    .then(data=>{
        response.status(200).json(data)
    })
    .catch(error=>{
        next(error);
    })
    }else{
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }  
}
//===================================



//===================================
//getDataByID



exports.getChildById = (request, response, next) => {
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if (request.role == "admin" || request.role == "teacher") {
        const _id = request.params._id;
        Child.findOne(_id)
            .then(child => {
                if (!child) {
                    return response.status(404).json({ message: "Child not found" });
                }
                response.status(200).json({ data: child });
            })
            .catch(error => next(error));
    } else {
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
};

//===================================


//===================================
//add



exports.addChild = (request, response, next) => {
    if (request.role == "admin" ) {
        let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
   
        let object = new Child({
            username: request.body.username,
            level:request.body.level,
            address:{city:request.body.city,street:request.body.street,building:request.body.building},
            age: request.body.age,
            role:"student",
            image:request.file.filename,
            teacherId:request.body.teacherId
            //image:request.body.image
            
        });
    
        object.save()
            .then(data => {
               
                response.status(201).json({ message: "added", data ,file:request.file});
            })
            .catch(error => {
                next(error); 
            });
       
    } else {
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }

   
};
//===================================


//===================================
//update




exports.UpdateChild = (request, response, next) => {
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if (request.role == "admin" ) {
        const _id = request.body._id;

    Child.findOneAndUpdate(_id, {
            $set: {
            level:request.body.level,
            address:{city:request.body.city,street:request.body.street,building:request.body.building},
            age: request.body.age,
           
            }
        })
        .then(data => {
            if(data==null)throw new Error("ID not found")
            response.status(200).json({ data: "update child" });
        })
        .catch(error => next(error));
    } else {
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
    
}

//===================================

//===================================
// delete child



exports.DeleteChild=(request,response,next)=>{
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if (request.role == "admin" ) {
        const _id = request.body._id;
        Child.findOneAndDelete(_id)
            .then(data => {
                if (data == null) throw new Error("ID not found");
                response.status(200).json({ data: "child deleted" });
            })
            .catch(error => next(error));
    } else {
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
   
}
