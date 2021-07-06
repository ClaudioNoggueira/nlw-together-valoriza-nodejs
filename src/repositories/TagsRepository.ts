import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../domain/Tag";

@EntityRepository(Tag)
class TagsRepository extends Repository<Tag>{

}

export { TagsRepository };