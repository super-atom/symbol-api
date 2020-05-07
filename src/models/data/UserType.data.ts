import { getConnection } from "typeorm";
import { UserTypeRule } from '../../rules/userType.rule';
import { UserType } from '../entity/UserType';

export const userTypeData = async () => {
    try {
        const check = await getConnection()
            .createQueryBuilder()
            .select('user_type')
            .from(UserType, 'user_type')
            .where("user_type.user_type = :id", { id: 0 })
            .getOne();

        if (check === undefined) {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(UserType)
                .values([
                    {
                        user_type: UserTypeRule.None,
                        user_type_name: "NONE"
                    },
                    {
                        user_type: UserTypeRule.Visitor,
                        user_type_name: "VISITOR"
                    },
                    {
                        user_type: UserTypeRule.User,
                        user_type_name: "USER"
                    },
                    {
                        user_type: UserTypeRule.Collaborator,
                        user_type_name: "COLLABORATOR"
                    },
                    {
                        user_type: UserTypeRule.Operator,
                        user_type_name: "OPERATOR"
                    },
                    {
                        user_type: UserTypeRule.Administor,
                        user_type_name: "ADMINISTOR"
                    }])
                .execute();
        }
    } catch (err) {
        console.log(err);
    }
}