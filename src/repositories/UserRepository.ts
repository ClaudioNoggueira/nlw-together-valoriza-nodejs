import { EntityRepository, Repository } from "typeorm"
import { User } from "../domain/User";

@EntityRepository()
class UserRepository extends Repository<User> {

}

export { UserRepository }