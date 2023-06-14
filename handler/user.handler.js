import { User, UserDetail } from "../model/user.model.js";


export const changeProfileHandler = async (req, reply) => {

}

export const getProfileHandler = async (req, reply) => {
    try {        
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            include: {
                model: UserDetail,
                as: "UserDetail",
                attributes: ['id', 'address', 'latitudes', 'longitudes']
            }
        })
        return reply.status(200).send({
            user
        })
    } catch (error) {
        console.log(error);
    }
}