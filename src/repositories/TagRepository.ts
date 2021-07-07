import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../domain/Tag";

@EntityRepository(Tag)
class TagRepository extends Repository<Tag>{

}

export { TagRepository };