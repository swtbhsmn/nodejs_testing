var express = require('express');
var router = express.Router();

let users = [
  { id: "i001", email: "swetabhsuman@gmail.com", firstName: "Swetabh", lastName: "Suman" },
  { id: "i002", email: "swetabh@gmail.com", firstName: "Swetabh", lastName: "Suman" },
  { id: "i003", email: "suman@gmail.com", firstName: "Swetabh", lastName: "Suman" },
  { id: "i004", email: "swtbhsmn@gmail.com", firstName: "Swetabh", lastName: "Suman" },
];
/* GET users listing. */
router.get('/', function (req, res, next) {

  res.json(users);
});

router.get('/:id', function (req, res, next) {
  try {

    //console.log(req.params.id)
    let user = users.find(user => user.id === req.params.id);
    if (!user) res.json({ message: "user not found!", data: null });
    res.json({ data: user, message: "user found!" });

  }
  catch (e) {
    throw new Error(e);
  }
});

/* POST users creating */
router.post('/create', function (req, res, next) {
  try {
    const { email, firstName, lastName } = req.body;
    let findUserByEmail = users.find(user => user.email === email)
    if (!findUserByEmail) {
      let uid = new Date()
      users.push({ id: `i00${uid.getMilliseconds()}`, email: email, firstName: firstName, lastName: lastName });
      res.status(201).json({ success: true, message: "user created successfully!" })
    }
   else{
    res.status(201).json({ success: false, message: "user already exists!" })
   }
  }
  catch (err) {
    throw new Error(err);
  }

});
/* PUT users updating */
router.put('/update/:id', function (req, res, next) {
  try {
    const { firstName, lastName } = req.body;
    let user = users.find(user => user.id === req.params.id);
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      res.json({
        data: user,
        message: "updated successfully!",
        success: true
      })
    }
    else{
      res.json({
        data: {},
        message: "not updated successfully!",
        success: false
      })
    }

  }
  catch (err) {
    throw new Error(err);
  }

});
/* DELETE users deteting */
router.delete('/delete/:id', function (req, res, next) {
  try {

    let user = users.find(user => user.id === req.params.id);
    if (!user) res.json({ data: {}, message: "user doesn't exists!", success: false });

    let findUser = users.findIndex(user => user.id === req.params.id);
    users.splice(findUser, 1);
    res.json({ data: user, message: "delete successfully!", success: true })

  }
  catch (err) {
    throw new Error(err);
  }

});

module.exports = router;
