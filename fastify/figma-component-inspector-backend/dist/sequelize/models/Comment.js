import { Model, DataTypes } from "sequelize";
export class Comment extends Model {
}
export function initCommentModel(sequelize) {
    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fileId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "file_id",
        },
        nodeId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "node_id",
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
        type: {
            type: DataTypes.ENUM('text', 'link'),
            allowNull: false,
            defaultValue: 'text',
        },
        priority: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [["high", "normal", "low"]],
            },
        },
        resolved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        positionX: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: "position_x",
        },
        positionY: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: "position_y",
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
        tableName: "figma_component_inspector_comments",
        timestamps: true,
        underscored: false, // We handle field mapping manually
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        indexes: [
            { fields: ["file_id"] },
            { fields: ["node_id"] },
            { fields: ["file_id", "node_id"] },
            { fields: ["resolved"] },
            { fields: ["type"] },
        ],
    });
    return Comment;
}
//# sourceMappingURL=Comment.js.map