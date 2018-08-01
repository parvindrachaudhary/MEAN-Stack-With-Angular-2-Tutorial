 const mongoose = require('mongoose');
 mongoose.Promise = global.Promise;
  const Schema = mongoose.Schema;




let titleLengthChecker = (title)=>{
   if (!title) {
     return false;
   } else {
    if (title.length <5 || title.length > 50) {
      return false;
    } else{
      return true;
    }
   }

}; 

let alphaNumericTitleChecker = (title) =>{
  if (!title) {
    return false;
  } else {
    const regExp =new RegExp(/^[a-zA-Z0-9 ]+$/);

  return regExp.test(title);  
  }
};


const titleValidators = [
{
 validator: titleLengthChecker,
 message: 'title must be at  least 5 characters but no more than 50'
},
{
  validator: alphaNumericTitleChecker,
  message: 'title must be alphanumeric.'
}];


let bodyLengthChecker =(body) => {
            if (!body) {
              return false;
            } else {
              if (body.length < 5 || body.length >500) {
                return false;
              }else {
                return true;
              }
            }
};


  
  const bodyValidators = [
      {
        validator: bodyLengthChecker,
        message: 'body must be at least 5 characters but no more than 500.'
      }
      ];

let commentLengthChecker =(comment) =>{
     if (!comment[0]) {
      return false;
     } else{
      if(comment[0].length <1 || comment[0].length >200){
        return false;
      } else{
        return true;
      }
     }
};


const commentValidators =[
{
  validator:commentLengthChecker,
  message: 'comment may not exceed 200 characters'
}];
  
  const blogSchema =new Schema({
       title: {
        type: String, 
        required: true,
        validate: titleValidators
      },
       body: { 
        type: String,
         required: true,
         validate:bodyValidators
       },
       createdBy: {
        type: String
      },
       createdAt: {
        type: Date, 
       Default:Date.now()
      },
       likes: {
        type: Number,
        
       }, 
       likedBy:{
        type: Array
      },
       disLikes:{
        type: Number,
       
      },
       disLikedBy:{
        type: Array},
       comments:[
      {
        commment:{
          type: String, 
          validate:commentValidators
        },
        commentator: {
          type: String
        }
        
      }
       ]
  });


 

module.exports = mongoose.model('Blog', blogSchema);
