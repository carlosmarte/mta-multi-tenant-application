import { Model, DataTypes } from "sequelize";
export class CommentTag extends Model {
}
export function initCommentTagModel(sequelize) {
    CommentTag.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        color: {
            type: DataTypes.STRING(7),
            allowNull: false,
            defaultValue: '#6B7280',
            validate: {
                is: /^#[0-9A-F]{6}$/i,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        tableName: "figma_component_inspector_comment_tags",
        timestamps: true,
        underscored: false,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        indexes: [
            { fields: ["name"] },
        ],
    });
    return CommentTag;
}
//# sourceMappingURL=CommentTag.js.map