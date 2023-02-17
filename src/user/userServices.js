var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModelData.save(function resultHandle(error, result) {

           if (error) {
               reject(false);
           } else {
               resolve(true);
           }
       });
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}


module.exports.searchUserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Usuario no encontrado"});
         }
         else {
            if(result != undefined && result != null) {
               resolve({status: true,msg: "Usuario encontrado"});
            }
            else{
               reject({status: false,msg: "Usuario no encontrado"});
            }

         }
      });
   });
}

module.exports.updateUserBDService = (userDetails) => {
   return new Promise( function myFun(resolve,reject){
      userModel.findOneAndUpdate({ email: userDetails.email}, userDetails, function getresult(errorvalue, result){
         if (errorvalue) {
            reject({status: false, msg: "Usuario no encontrado"});
         } else {
            if(result != undefined && result != null){
               resolve({status: true, msg: 'Usuario actualizado'})
            }
            else{
               reject({status: false, msg: 'Usuarios no encontrado'})
            }
         }
      })
   })
}

module.exports.deleteUserService = (userDetails) => {
   return new Promise( function myFun(resolve,reject){
      userModel.findOneAndDelete({ email: userDetails.email}, function getresult(error,result){
         if (error) {
            reject({status: false, msg: 'Usuario no encontrado'});
         } else {
            if(result != undefined && result != null){
               resolve({status: true, msg: 'Usuario Eliminado'})
            }
            else{
               reject({status: false, msg: 'Usuarios no validos'})
            }
         }
      })
   })
}