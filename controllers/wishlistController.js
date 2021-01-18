const Wishlist = require("../models/wisataRelated/wishlistWisata");

class WishlistController{
    static createWishlist(req, res, next){
        let userid = req.decoded.id;
        let places_id = req.query.id;
        let { types, name_place } = req.body;

        Wishlist.create({user: userid, place_id: places_id, types, name_place})
        .then((wishlist) => {
            res.status(200).json({wishlist});
        }).catch(err => {
            if(err){
                console.log(err);
            }
        });
    }

    static getMyWishlist(req, res, next){
        let userid = req.decoded.id;

        Wishlist.find({user: userid})
        .populate("user")
        .then((wishlists) => {
            res.status(200).json({wishlists});
        }).catch(next);
    }

    static deleteWishlist(req, res, next){
        let userid = req.decoded.id;
        let places_id = req.query.id;

        Wishlist.findOneAndDelete({user: userid, place_id: places_id})
        .then(() => {
            res.status(200).json({message: "Done delete!"});
        }).catch(err => {
            if(err){
                console.log(err);
            }
        });
    }
}

module.exports = WishlistController;