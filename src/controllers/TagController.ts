import { Request, response, Response } from "express";
import { TagService } from "../services/TagService";

class TagController {
    async createTag(request: Request, response: Response) {
        const { name } = request.body;
        const tagService = new TagService();

        const tag = await tagService.createTag(name);

        return response.json(tag);
    }

    async listTags(request: Request, response: Response) {
        const tagService = new TagService();

        const tag = await tagService.listTag();

        return response.json(tag);
    }
}

export { TagController };