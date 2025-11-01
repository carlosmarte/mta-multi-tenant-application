import { Model, Sequelize, Optional } from "sequelize";
import type { CommentReply } from "./CommentReply.js";
import type { CommentTag } from "./CommentTag.js";
export type CommentType = 'text' | 'link';
export interface CommentAttributes {
    id: number;
    fileId: string;
    nodeId: string | null;
    userId: string;
    userName: string;
    userAvatar: string | null;
    text: string;
    type: CommentType;
    priority: string | null;
    resolved: boolean;
    positionX: number | null;
    positionY: number | null;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface CommentCreationAttributes extends Optional<CommentAttributes, "id" | "nodeId" | "userAvatar" | "type" | "priority" | "positionX" | "positionY" | "resolved" | "timestamp" | "createdAt" | "updatedAt"> {
}
export declare class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    id: number;
    fileId: string;
    nodeId: string | null;
    userId: string;
    userName: string;
    userAvatar: string | null;
    text: string;
    type: CommentType;
    priority: string | null;
    resolved: boolean;
    positionX: number | null;
    positionY: number | null;
    timestamp: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    replies?: CommentReply[];
    tags?: CommentTag[];
    readonly replyCount?: number;
}
export declare function initCommentModel(sequelize: Sequelize): typeof Comment;
//# sourceMappingURL=Comment.d.ts.map