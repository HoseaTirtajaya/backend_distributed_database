const Review = require("../models/wisataRelated/Review");

class reviewController{
    static createReview(req, res, next){
        let userid = req.decoded.id;
        let places_id = req.query.id;
        let {rate, review} = req.body;

        if(rate > 5 || rate < 1){
            return res.status(400).json({message: "The rate minimum is 1 and maximum is 5"});
        } else {
            Review.create({
                user: userid,
                place_id: places_id,
                review,
                rate
            })
            .then((review) => {
                res.status(200).json({review});
            }).catch(next);
        }
    }
    static getReviewByPlaceId(req, res, next){
        let places_id = req.query.id;

        Review.find({place_id: places_id})
        .populate("user", "full_name gender phone_no")
        .then((reviews) => {
            res.status(200).json({reviews});
        }).catch(next);
    }
}

module.exports = reviewController;
