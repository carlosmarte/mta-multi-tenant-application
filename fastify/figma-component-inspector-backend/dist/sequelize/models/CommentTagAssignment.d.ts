import { Model, Sequelize, Optional } from "sequelize";
export interface CommentTagAssignmentAttributes {
    id: number;
    commentId: number;
    tagId: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface CommentTagAssignmentCreationAttributes extends Optional<CommentTagAssignmentAttributes, "id" | "createdAt" | "updatedAt"> {
}
export declare class CommentTagAssignment extends Model<CommentTagAssignmentAttributes, CommentTagAssignmentCreationAttributes> implements CommentTagAssignmentAttributes {
    id: number;
    commentId: number;
    tagId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export declare function initCommentTagAssignmentModel(sequelize: Sequelize): typeof CommentTagAssignment;
//# sourceMappingURL=CommentTagAssignment.d.ts.map