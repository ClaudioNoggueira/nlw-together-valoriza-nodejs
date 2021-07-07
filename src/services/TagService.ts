import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";

class TagService {
    async createTag(name: string) {
        const tagsRepository = getCustomRepository(TagRepository);
        if (!name) {
            throw new Error("Incorrect name!");
        }

        //SELECT * FROM TAGS WHERE NAME = 'name'
        const tagAlreadyExists = await tagsRepository.findOne({
            name
        });

        if (tagAlreadyExists) {
            throw new Error("Tag already exists!");
        }

        const tag = tagsRepository.create({
            name
        });

        await tagsRepository.save(tag);
        return tag;
    }

    async listTag() {
        const tagRepository = getCustomRepository(TagRepository);

        const tags = await tagRepository.find();

        return tags;
    }
}

export { TagService }
