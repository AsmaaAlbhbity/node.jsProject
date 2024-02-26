//===================================
//incrept password
const bcrypt = require('bcrypt');
//===================================

//===================================
//validator
const {validationResult, body} =require("express-validator");
const Teacher = require("./../Modal/teacherSchema");
require("dotenv").config();
//===================================


//===================================
//getAllDate


exports.getAllTeacher=(request,response,next)=>{
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if(request.role=="admin"){
        Teacher.find({})
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




exports.getTeacherById = (request, response, next) => {
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if(request.role=="admin"||request.role=="teacher"){
        const _id = request.params._id;
        Teacher.findOne(_id)
            .then(teacher => {
                // if (!teacher) {
                //     return response.status(404).json({ message: "teacher not found" });
                // }
                response.status(200).json({ data: teacher });
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



exports.addTeacher = (request, response, next) => {
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
    if(request.role=="admin"||request.role=="teacher"){
        
    //===================================
    // Hash the password
        bcrypt.hash(request.body.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
       
     //===================================
        let object = new Teacher({
            username: request.body.username,
            Email: request.body.Email,
            password: hash,
            role: "admin",
           image:request.file.filename,
           //image:request.file.path,
           //image:"jj",


        });
        console.log(object.password);
        object.save()
            .then(data => {
                response.status(201).json({ message: "added", data });
            })
            .catch(error => {
                
                next(error); 
            });
        });
    }else{
        const error = new Error("Not Authorized");
        error.status = 403;
        next(error);


    }
   
};
//===================================


//===================================
// update Teacher



exports.UpdateTeacher = (request, response, next) => {
    let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
            throw error;
        }
    if(request.role=="admin"||request.role=="teacher"){
        const _id = request.body._id;

        Teacher.findOneAndUpdate(_id, {
                $set: {
                    
                   password:request.body.password,
                    Email: request.body.Email
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



exports.DeleteTeacher = (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, err) => current + err.msg + ","," ");
        throw error;
    }
    if(request.role=="admin"){
        const _id = request.body._id;
        Teacher.findOneAndDelete(_id)
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
