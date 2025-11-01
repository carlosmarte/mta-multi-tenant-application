/**
 * Comments Routes
 *
 * API endpoints for comment management.
 * Implements Zod validation and defensive error handling.
 */
import { CreateCommentRequestSchema, UpdateCommentRequestSchema, CreateCommentReplyRequestSchema, GetCommentsQuerySchema, CreateTagRequestSchema, UpdateTagRequestSchema, } from '../zod-schema-contract/index.js';
export async function registerRoutes(fastify) {
    /**
     * GET /api/comments
     * Get comments for a file or node
     */
    fastify.get('/comments', async (request, reply) => {
        // Validate query
        const query = GetCommentsQuerySchema.parse(request.query);
        // Build where clause
        const where = { fileId: query.fileId };
        if (query.nodeId) {
            where.nodeId = query.nodeId;
        }
        if (query.resolved === 'true') {
            where.resolved = true;
        }
        else if (query.resolved === 'false') {
            where.resolved = false;
        }
        // Fetch comments with replies and tags using Sequelize
        const comments = await fastify.figmaInspectorDb.Comment.findAll({
            where,
            include: [
                {
                    model: fastify.figmaInspectorDb.CommentReply,
                    as: 'replies',
                },
                {
                    model: fastify.figmaInspectorDb.CommentTag,
                    as: 'tags',
                    through: { attributes: [] }, // Don't include the junction table in results
                },
            ],
            order: [['timestamp', 'DESC']],
        });
        // Add reply count to each comment
        const commentsWithCount = comments.map(comment => {
            const commentData = comment.toJSON();
            commentData.replyCount = commentData.replies ? commentData.replies.length : 0;
            return commentData;
        });
        return reply.send({
            success: true,
            data: commentsWithCount,
            count: commentsWithCount.length,
        });
    });
    /**
     * POST /api/comments
     * Create a new comment
     */
    fastify.post('/comments', async (request, reply) => {
        // Validate body
        const data = CreateCommentRequestSchema.parse(request.body);
        // Create comment using Sequelize
        const comment = await fastify.figmaInspectorDb.Comment.create({
            fileId: data.fileId,
            nodeId: data.nodeId || null,
            userId: data.userId,
            userName: data.userName,
            userAvatar: data.userAvatar || null,
            text: data.text,
            type: data.type || 'text',
            priority: data.priority || null,
            positionX: data.position?.x || null,
            positionY: data.position?.y || null,
            timestamp: new Date(),
        });
        // Add tags if provided
        if (data.tagIds && data.tagIds.length > 0) {
            const tags = await fastify.figmaInspectorDb.CommentTag.findAll({
                where: { id: data.tagIds },
            });
            await comment.setTags(tags);
        }
        // Fetch the comment with tags to return
        const commentWithTags = await fastify.figmaInspectorDb.Comment.findByPk(comment.id, {
            include: [
                {
                    model: fastify.figmaInspectorDb.CommentTag,
                    as: 'tags',
                    through: { attributes: [] },
                },
            ],
        });
        return reply.status(201).send({
            success: true,
            data: commentWithTags,
        });
    });
    /**
     * PATCH /api/comments/:id
     * Update a comment
     */
    fastify.patch('/comments/:id', async (request, reply) => {
        const commentId = parseInt(request.params.id, 10);
        // Defensive validation
        if (isNaN(commentId)) {
            return reply.status(400).send({
                success: false,
                error: 'Invalid comment ID',
            });
        }
        // Validate body
        const data = UpdateCommentRequestSchema.parse(request.body);
        // Check if comment exists
        const existingComment = await fastify.figmaInspectorDb.Comment.findByPk(commentId);
        if (!existingComment) {
            return reply.status(404).send({
                success: false,
                error: 'Comment not found',
            });
        }
        // Build update data
        const updateData = {};
        if (data.text !== undefined) {
            updateData.text = data.text;
        }
        if (data.type !== undefined) {
            updateData.type = data.type;
        }
        if (data.priority !== undefined) {
            updateData.priority = data.priority;
        }
        if (data.resolved !== undefined) {
            updateData.resolved = data.resolved;
        }
        if (data.position !== undefined) {
            updateData.positionX = data.position.x;
            updateData.positionY = data.position.y;
        }
        // Update comment using Sequelize
        await existingComment.update(updateData);
        // Update tags if provided
        if (data.tagIds !== undefined) {
            if (data.tagIds.length > 0) {
                const tags = await fastify.figmaInspectorDb.CommentTag.findAll({
                    where: { id: data.tagIds },
                });
                await existingComment.setTags(tags);
            }
            else {
                // Remove all tags if empty array
                await existingComment.setTags([]);
            }
        }
        // Reload with associations
        await existingComment.reload({
            include: [
                {
                    model: fastify.figmaInspectorDb.CommentReply,
                    as: 'replies',
                },
                {
                    model: fastify.figmaInspectorDb.CommentTag,
                    as: 'tags',
                    through: { attributes: [] },
                },
            ],
        });
        const updatedComment = existingComment;
        return reply.send({
            success: true,
            data: updatedComment,
        });
    });
    /**
     * DELETE /api/comments/:id
     * Delete a comment
     */
    fastify.delete('/comments/:id', async (request, reply) => {
        const commentId = parseInt(request.params.id, 10);
        // Defensive validation
        if (isNaN(commentId)) {
            return reply.status(400).send({
                success: false,
                error: 'Invalid comment ID',
            });
        }
        // Check if comment exists
        const comment = await fastify.figmaInspectorDb.Comment.findByPk(commentId);
        if (!comment) {
            return reply.status(404).send({
                success: false,
                error: 'Comment not found',
            });
        }
        // Delete comment using Sequelize (cascade delete will handle replies)
        await comment.destroy();
        return reply.send({
            success: true,
            message: 'Comment deleted',
        });
    });
    /**
     * POST /api/comments/:id/replies
     * Add a reply to a comment
     */
    fastify.post('/comments/:id/replies', async (request, reply) => {
        const commentId = parseInt(request.params.id, 10);
        // Defensive validation
        if (isNaN(commentId)) {
            return reply.status(400).send({
                success: false,
                error: 'Invalid comment ID',
            });
        }
        // Validate body
        const data = CreateCommentReplyRequestSchema.parse(request.body);
        // Check if comment exists
        const comment = await fastify.figmaInspectorDb.Comment.findByPk(commentId);
        if (!comment) {
            return reply.status(404).send({
                success: false,
                error: 'Comment not found',
            });
        }
        // Create reply using Sequelize
        const replyRecord = await fastify.figmaInspectorDb.CommentReply.create({
            commentId,
            userId: data.userId,
            userName: data.userName,
            userAvatar: data.userAvatar || null,
            text: data.text,
            timestamp: new Date(),
        });
        return reply.status(201).send({
            success: true,
            data: replyRecord,
        });
    });
    /**
     * GET /api/tags
     * Get all available tags
     */
    fastify.get('/tags', async (request, reply) => {
        const tags = await fastify.figmaInspectorDb.CommentTag.findAll({
            order: [['name', 'ASC']],
        });
        return reply.send({
            success: true,
            data: tags,
        });
    });
    /**
     * POST /api/tags
     * Create a new tag
     */
    fastify.post('/tags', async (request, reply) => {
        // Validate body
        const data = CreateTagRequestSchema.parse(request.body);
        // Check if tag with same name already exists
        const existingTag = await fastify.figmaInspectorDb.CommentTag.findOne({
            where: { name: data.name },
        });
        if (existingTag) {
            return reply.status(409).send({
                success: false,
                error: 'Tag with this name already exists',
            });
        }
        // Create tag using Sequelize
        const tag = await fastify.figmaInspectorDb.CommentTag.create({
            name: data.name,
            color: data.color || '#6B7280',
            description: data.description || null,
        });
        return reply.status(201).send({
            success: true,
            data: tag,
        });
    });
    /**
     * PATCH /api/tags/:id
     * Update a tag
     */
    fastify.patch('/tags/:id', async (request, reply) => {
        const tagId = parseInt(request.params.id, 10);
        // Defensive validation
        if (isNaN(tagId)) {
            return reply.status(400).send({
                success: false,
                error: 'Invalid tag ID',
            });
        }
        // Validate body
        const data = UpdateTagRequestSchema.parse(request.body);
        // Check if tag exists
        const existingTag = await fastify.figmaInspectorDb.CommentTag.findByPk(tagId);
        if (!existingTag) {
            return reply.status(404).send({
                success: false,
                error: 'Tag not found',
            });
        }
        // Check for name conflict if updating name
        if (data.name && data.name !== existingTag.name) {
            const duplicateTag = await fastify.figmaInspectorDb.CommentTag.findOne({
                where: { name: data.name },
            });
            if (duplicateTag) {
                return reply.status(409).send({
                    success: false,
                    error: 'Tag with this name already exists',
                });
            }
        }
        // Update tag
        await existingTag.update({
            name: data.name !== undefined ? data.name : existingTag.name,
            color: data.color !== undefined ? data.color : existingTag.color,
            description: data.description !== undefined ? data.description : existingTag.description,
        });
        return reply.send({
            success: true,
            data: existingTag,
        });
    });
    /**
     * DELETE /api/tags/:id
     * Delete a tag
     */
    fastify.delete('/tags/:id', async (request, reply) => {
        const tagId = parseInt(request.params.id, 10);
        // Defensive validation
        if (isNaN(tagId)) {
            return reply.status(400).send({
                success: false,
                error: 'Invalid tag ID',
            });
        }
        // Check if tag exists
        const existingTag = await fastify.figmaInspectorDb.CommentTag.findByPk(tagId);
        if (!existingTag) {
            return reply.status(404).send({
                success: false,
                error: 'Tag not found',
            });
        }
        // Delete tag (will automatically remove associations due to CASCADE)
        await existingTag.destroy();
        return reply.send({
            success: true,
            message: 'Tag deleted successfully',
        });
    });
}
//# sourceMappingURL=comments.routes.js.map