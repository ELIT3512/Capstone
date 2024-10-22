const models = require('../models');


module.exports = {
    get: (req, res, next) => {
        models.Claim.find().populate('owner')
            .then((Claims) => res.send(Claims))
            .catch(next);
    },
    post: (req, res, next) => {
       

            const { MedicalProvider, DescriptionOfClaim, Price } = req.body;
            const { _id } = req.user;

            // Create Claim with the relative path to the image
           
            models.Claim.create({
                MedicalProvider,
                DescriptionOfClaim,
                Price,
                owner: _id
            })
            .then((createdClaim) => {
                return Promise.all([
                    models.User.updateOne({ _id:_id }, { $push: { Claims: createdClaim._id } }),
                    models.Claim.findOne({ _id: createdClaim._id })
                ]);
            })
            .then(([_, ClaimObj]) => {
                res.send(ClaimObj);
            })
            .catch(next);
        
    },
    put: (req, res, next) => {
        const id = req.params.id;
        const {MedicalProvider, DescriptionOfClaim,Price} = req.body;
        models.Claim.updateOne({ _id: id }, {MedicalProvider, DescriptionOfClaim,price})
            .then((updatedClaim) => res.send(updatedClaim))
            .catch(next)
    },
    delete: (req, res, next) => {
        const id = req.params.id;
        models.Claim.deleteOne({ _id: id })
            .then((removedClaim) => res.send(removedClaim))
            .catch(next)
    }
};