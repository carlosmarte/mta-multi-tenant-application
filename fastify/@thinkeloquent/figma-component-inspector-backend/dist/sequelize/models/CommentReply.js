import { Model, DataTypes } from "sequelize";
export class CommentReply extends Model {
}
export function initCommentReplyModel(sequelize) {
    CommentReply.init({
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
                model: "comments",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "user_id",
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "user_name",
        },
        userAvatar: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "user_avatar",
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
        tableName: "figma_component_inspector_comment_replies",
        timestamps: true,
        underscored: false, // We handle field mapping manually
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        indexes: [{ fields: ["comment_id"] }],
    });
    return CommentReply;
}
//# sourceMappingURL=CommentReply.js.map