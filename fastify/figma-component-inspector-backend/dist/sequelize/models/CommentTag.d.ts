import { Model, Sequelize, Optional } from "sequelize";
import type { Comment } from "./Comment.js";
export interface CommentTagAttributes {
    id: number;
    name: string;
    color: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface CommentTagCreationAttributes extends Optional<CommentTagAttributes, "id" | "description" | "createdAt" | "updatedAt"> {
}
export declare class CommentTag extends Model<CommentTagAttributes, CommentTagCreationAttributes> implements CommentTagAttributes {
    id: number;
    name: string;
    color: string;
    description: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    comments?: Comment[];
}
export declare function initCommentTagModel(sequelize: Sequelize): typeof CommentTag;
//# sourceMappingURL=CommentTag.d.ts.map