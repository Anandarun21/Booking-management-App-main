const User = require('../Models/User');

exports.getAddProduct = (req, res, next) => {
	User.findAll()
		.then(UserDetails => {
			// console.log(UserDetails);
			res.json(UserDetails);
		}).catch(err => console.log(err, 'SOME ERROR OCCURED DURING GETTING THE PRODUCTS FROM DB'));
}

exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    return User.create({
        Name: name,
        Mail: email,
        Phone: phone 
    }).then((data) => {
        return res.json(data);
    }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
	const id = req.body.id;
	User.findByPk(id)
		.then(data => {
			return data.destroy();
		})
		.then(() => {
			console.log('successfully deleted');
			res.redirect('/add-user');
		})
		.catch(err => console.log(err));
}

// exports.getEditedUser = (req, res, next) => {

// }
exports.postEditedUser = (req, res, next) => {
	const id = req.params.id;
	const name = req.body.name;
	const email = req.body.email;
	User.findByPk(id)
		.then(userData => {
			userData.Name = name;
			userData.Mail = email;
			return userData.save();
		})
		.then(data => {
			console.log(res, 'succesfully done');
			res.json(data);
		})
		.catch(err => console.log(err));
}
