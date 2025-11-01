import { Model, DataTypes } from "sequelize";
export class CommentTagAssignment extends Model {
}
export function initCommentTagAssignmentModel(sequelize) {
    CommentTagAssignment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "comment_id",
            references: {
                model: "figma_component_inspector_comments",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "tag_id",
            references: {
                model: "figma_component_inspector_comment_tags",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "created_at",
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "updated_at",
        },
    }, {
        sequelize,
        tableName: "figma_component_inspector_comment_tag_assignments",
        timestamps: true,
        underscored: false,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        indexes: [
            { fields: ["comment_id"] },
            { fields: ["tag_id"] },
            {
                fields: ["comment_id", "tag_id"],
                unique: true,
            },
        ],
    });
    return CommentTagAssignment;
}
//# sourceMappingURL=CommentTagAssignment.js.map