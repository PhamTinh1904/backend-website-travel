const ReviewServieces = require("../services/review.services")


class ReviewController {
    static create =  async(req, res)=>{
        const data = req.body
        const tourId = req.params.tourId

        try{
            const result = await ReviewServieces.createReview(data, tourId)
            if(!result.success){
                return res.status(404).json(result)
            }

            return res.status(200).json(result)
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = ReviewController