import Itinerary from "../models/itinerary.js";


const handleItineraryDetails = async (req, res)=>{
    try {
        const image_number = Math.floor(Math.random()*5)+1;
        const { destination, to, from, budget, group , interest} = req.body;
        
        const user_id = req.user.user_id;
        
        
        await Itinerary.create({
            user_id: user_id,
            destination: destination,
            startDate: to,
            endDate: from,
            budget: budget,
            group: group,
            interest: interest,
            image_number: image_number,
        })
        
        return res.status(200).json({message: 'Details Saved'});
    } catch (error) {
        console.log("Error in handleItineraryDetails function at backend");
        return res.json({message: 'Error at backend'});
    }
}

export default handleItineraryDetails;