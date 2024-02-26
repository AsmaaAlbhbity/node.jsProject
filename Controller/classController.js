//===================================
//incrept password
const bcrypt = require('bcrypt');
//===================================

//===================================
//validator
const {validationResult, body} =require("express-validator");
const Class = require("./../Modal/classSchema");
require("dotenv").config();
//===================================


//===================================
//getAllDate

exports.getAllClasses=(request,response,next)=>{
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if(request.role=="admin"){
        Class.find({})
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



exports.getClassById = (request, response, next) => {
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if(request.role=="admin"){
        const _id = request.params._id;
        Class.findOne(_id)
            .then(clas => {
                // if (!teacher) {
                //     return response.status(404).json({ message: "teacher not found" });
                // }
                response.status(200).json({ data: clas });
            })
            .catch(error => next(error));
    }else{
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
    
   
};
//===================================





//===================================
//add


exports.addClass = (request, response, next) => {
    let errors = validationResult(request);
    
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            console.log(error.message );

            throw error;
            // console.log(request.body);
        }
    // console.log(request.body);
    if(request.role=="admin"){
        
   
        let object = new Class({
            name: request.body.name,
                    supervisor: request.body.supervisor,
                    children: request.body.children


        });
        
        object.save()
            .then(data => {
                response.status(201).json({ message: "added", data });
            })
            .catch(error => {
                
                next(error); 
            });
        
    }else{
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);


    }
   
};
//===================================


//===================================
// update 



exports.UpdateClass = (request, response, next) => {
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if(request.role=="admin"){
        const _id = request.body._id;

        Class.findOneAndUpdate({_id:_id}, {
                $set: {
                    
                                
                                supervisor: request.body.supervisor,
                                children: request.body.children
            
            
                   
                }
            })
            .then(data => {
                // if(data==null)throw new Error("ID not found")
                response.status(200).json({ data: "update Teacher" });
            })
            .catch(error => next(error));
    }else{
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
   
}
//===================================




//===================================
// delete Teacher


exports.DeleteClass = (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
        throw error;
    }
    if(request.role=="admin"){
        const _id = request.body._id;
        Class.findOneAndDelete({_id:_id})
            .then(data => {
                // if (data == null) throw new Error("ID not found");
                response.status(200).json({ data: "teacher deleted" });
            })
            .catch(error => next(error));
    }else{
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);}
   
}

//===================================
