import { Model, Sequelize, Optional, ForeignKey } from "sequelize";
import type { Comment } from "./Comment.js";
export interface CommentReplyAttributes {
    id: number;
    commentId: number;
    userId: string;
    userName: string;
    userAvatar: string | null;
    text: string;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface CommentReplyCreationAttributes extends Optional<CommentReplyAttributes, "id" | "userAvatar" | "timestamp" | "createdAt" | "updatedAt"> {
}
export declare class CommentReply extends Model<CommentReplyAttributes, CommentReplyCreationAttributes> implements CommentReplyAttributes {
    id: number;
    commentId: ForeignKey<Comment["id"]>;
    userId: string;
    userName: string;
    userAvatar: string | null;
    text: string;
    timestamp: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    comment?: Comment;
}
export declare function initCommentReplyModel(sequelize: Sequelize): typeof CommentReply;
//# sourceMappingURL=CommentReply.d.ts.map