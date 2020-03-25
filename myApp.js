/**********************************************
* 3. FCC Mongo & Mongoose Challenges
* ==================================
***********************************************/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** # MONGOOSE SETUP #
/*  ================== */

/** 1) Install & Set up mongoose */

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 


/** # SCHEMAS and MODELS #
/*  ====================== */

/** 2) Create a 'Person' Model */

var personSchema =  new Schema({
    name:  { type: String, required: true }, 
    age: { type: Number, required: true },
    favoriteFoods: [String]   
  });

var Person = mongoose.model('Person', personSchema);

/** # [C]RUD part I - CREATE #
/*  ========================== */

/** 3) Create and Save a Person */

 var createAndSavePerson = function(done) {
  let person = new Person({name:'Nicolas', age:30, favoriteFoods: ['pizza']})
   person.save(function(err, data) {
   if(err) {
     console.log(err)
     return done(err);
   }
    done(null, data);
  });   
 };


/** 4) Create many People with `Model.create()` */

var createManyPeople = function(arrayOfPeople, done) {    
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return done(err);
    done(null,data);
  })         
};


/** # C[R]UD part II - READ #
/*  ========================= */

/** 5) Use `Model.find()` */

var findPeopleByName = function(personName, done) { 
  Person.find({name:personName}, function (err, data) {
    if(err) return done(err);
    return done(null,data);    
  }) 
};


/** 6) Use `Model.findOne()` */

var findOneByFood = function(food, done) {
 Person.findOne({favoriteFoods:food}, function (err, data) {  
    if(err) return done(err);
    return done(null,data);    
  }) 
};

/** 7) Use `Model.findById()` */

var findPersonById = function(personId, done) {  
  Person.findById(personId, function (err, data) {  
    if(err) return done(err);
    return done(null,data);    
  })   
};

/** # CR[U]D part III - UPDATE # 
/*  ============================ */

/** 8) Classic Update : Find, Edit then Save */

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';  
  Person.findById(personId, function (err, data) {  
    if(err) return done(err);
    data.favoriteFoods.push(foodToAdd);
    data.save(function (err, result) { 
       if(err) return done(err);
       return done(null,result);    
    })  
  })   
};

/** 9) New Update : Use `findOneAndUpdate()` */

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{ new: true }, function (err, data) {  
    if(err) return done(err);
    return done(null,data);    
  })   
};

/** # CRU[D] part IV - DELETE #
/*  =========================== */

/** 10) Delete one Person */

var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, function (err, data) {  
    if(err) return done(err);
    return done(null,data);    
  })   
};

/** 11) Delete many People */

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, function (err, data) {  
    if(err) return done(err);
    return done(null,data);    
  })   
  
};

/** # C[R]UD part V -  More about Queries # 
/*  ======================================= */

/** 12) Chain Query helpers */

var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec(function (err, data) {      
    if(err) return done(err);
    return done(null,data);    
  })
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
