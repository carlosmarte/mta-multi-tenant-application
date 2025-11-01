import { Comment } from './models/Comment.js';
import { CommentReply } from './models/CommentReply.js';
import { CommentTag } from './models/CommentTag.js';
import { CommentTagAssignment } from './models/CommentTagAssignment.js';
export function setupAssociations() {
    // Comment has many CommentReply
    Comment.hasMany(CommentReply, {
        foreignKey: 'commentId',
        as: 'replies',
        onDelete: 'CASCADE',
    });
    // CommentReply belongs to Comment
    CommentReply.belongsTo(Comment, {
        foreignKey: 'commentId',
        as: 'comment',
    });
    // Comment belongs to many CommentTag (many-to-many through CommentTagAssignment)
    Comment.belongsToMany(CommentTag, {
        through: CommentTagAssignment,
        foreignKey: 'commentId',
        otherKey: 'tagId',
        as: 'tags',
    });
    // CommentTag belongs to many Comment (many-to-many through CommentTagAssignment)
    CommentTag.belongsToMany(Comment, {
        through: CommentTagAssignment,
        foreignKey: 'tagId',
        otherKey: 'commentId',
        as: 'comments',
    });
    // Virtual field for reply count
    Comment.addHook('afterFind', (comments) => {
        if (!comments)
            return;
        const processComment = async (comment) => {
            if (comment.replies) {
                comment.dataValues.replyCount = comment.replies.length;
            }
        };
        if (Array.isArray(comments)) {
            comments.forEach(processComment);
        }
        else {
            processComment(comments);
        }
    });
}
//# sourceMappingURL=associations.js.map