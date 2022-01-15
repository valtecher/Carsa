const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
import db from "../../database/models";

passport.use(
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        function (jwtPayload: any, done: any) {
            return db.Client.findOne({where: {person_id: jwtPayload.id}})
                .then((user: any) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        db.Employee.findOne({where: {person_id: jwtPayload.id}}).then((emp: any) => {
                            if (emp) {
                                return done(null, emp)
                            } else {
                                return done(null, null)
                            }

                        })
                    }

                })
                .catch((err: string) => {
                    return done(err);
                })
        }
    )
)


module.exports = passport