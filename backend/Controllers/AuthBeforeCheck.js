import {isUniqueEmail} from "../Utilities/Users/utilsU.js";


function CheckRegField(req,res,next) {
    //console.log(req.body);
    let email = req.body.email;

    let id = req.body.id;

    let e_u = isUniqueEmail(email)
        .then(e_u => {
            if (e_u) {
                // console.log('GOOD');

                next();

            } else {

                res.status(400).send({message: 'Not unique email'});
                //next();
                //return;
            }
        })
        .catch(err => {
            console.log(err);
        })
}
export {CheckRegField}