import { ApiError } from "../middlewares/error.middleware.js";
import TableService from "../services/table.service.js";
import autoBind from "../utils/auto-bind.util.js";

class TableController {
    constructor () {
        this.tableService = new TableService();
        autoBind(this);
    }

    async create(req, res, next) {
        try {
            const table = await this.tableService.create(req.body);
            res.status(200).json(table);
        } catch (error) {
            next(new ApiError(error.status || 500, error.message || 'Failed to create table'));
        }
    }

    async getAll(req, res, next) {
        try {
            const tables = await this.tableService.getAll();
            res.status(200).json(tables);
        } catch (error) {
            next(new ApiError(error.status || 500, error.message || 'Failed to get tables'));
        }
    }

    async getOne(req, res, next) {
        try {
            const table = await this.tableService.getOne(req.params.id);
            res.status(200).json(table);
        } catch (error) {
            next(new ApiError(error.status || 500, error.message || 'Failed to get table'));
        }
    }

    async update(req, res, next) {
        try {
            const table = await this.tableService.update(req.params.id, req.body);
            res.status(200).json(table);
        } catch (error) {
            next(new ApiError(error.status || 500, error.message || 'Failed to update table'));
        }
    }

    async delete(req, res, next) {
        try {
            await this.tableService.delete(req.params.id);
            res.status(200).json({ message: 'Table deleted successfully' });
        } catch (error) {
            next(new ApiError(error.status || 500, error.message || 'Failed to delete table'));
        }
    }
}

export default new TableController();