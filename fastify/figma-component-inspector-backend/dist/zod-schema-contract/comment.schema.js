/**
 * Comment Schema Contracts
 *
 * Zod validation schemas for comment and annotation types.
 */
import { z } from 'zod';
/**
 * Comment Type
 */
export const CommentTypeSchema = z.enum(['text', 'link']);
/**
 * Comment Priority
 */
export const CommentPrioritySchema = z.enum(['high', 'normal', 'low']);
/**
 * Comment Tag
 */
export const CommentTagSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
    description: z.string().optional(),
});
/**
 * Comment Reply
 */
export const CommentReplySchema = z.object({
    id: z.number(),
    userId: z.string(),
    userName: z.string(),
    userAvatar: z.string().optional(),
    text: z.string().min(1, 'Reply text cannot be empty'),
    timestamp: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
/**
 * Comment Position (for pinned comments)
 */
export const CommentPositionSchema = z.object({
    x: z.number(),
    y: z.number(),
});
/**
 * Comment
 */
export const CommentSchema = z.object({
    id: z.number(),
    fileId: z.string(),
    nodeId: z.string().optional(),
    userId: z.string(),
    userName: z.string(),
    userAvatar: z.string().optional(),
    text: z.string().min(1, 'Comment text cannot be empty'),
    type: CommentTypeSchema.default('text'),
    priority: CommentPrioritySchema.optional(),
    resolved: z.boolean().default(false),
    position: CommentPositionSchema.optional(),
    timestamp: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    replies: z.array(CommentReplySchema).optional(),
    tags: z.array(CommentTagSchema).optional(),
    replyCount: z.number().optional(),
});
/**
 * Create Comment Request
 */
export const CreateCommentRequestSchema = z.object({
    fileId: z.string().min(1, 'File ID is required'),
    nodeId: z.string().optional(),
    userId: z.string().min(1, 'User ID is required'),
    userName: z.string().min(1, 'User name is required'),
    userAvatar: z.string().optional(),
    text: z.string().min(1, 'Comment text cannot be empty').max(5000, 'Comment text too long'),
    type: CommentTypeSchema.optional().default('text'),
    priority: CommentPrioritySchema.optional(),
    position: CommentPositionSchema.optional(),
    tagIds: z.array(z.number()).optional(),
});
/**
 * Update Comment Request
 */
export const UpdateCommentRequestSchema = z.object({
    text: z.string().min(1, 'Comment text cannot be empty').max(5000, 'Comment text too long').optional(),
    type: CommentTypeSchema.optional(),
    priority: CommentPrioritySchema.optional(),
    resolved: z.boolean().optional(),
    position: CommentPositionSchema.optional(),
    tagIds: z.array(z.number()).optional(),
});
/**
 * Create Comment Reply Request
 */
export const CreateCommentReplyRequestSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    userName: z.string().min(1, 'User name is required'),
    userAvatar: z.string().optional(),
    text: z.string().min(1, 'Reply text cannot be empty').max(5000, 'Reply text too long'),
});
/**
 * Get Comments Query
 */
export const GetCommentsQuerySchema = z.object({
    fileId: z.string().min(1, 'File ID is required'),
    nodeId: z.string().optional(),
    resolved: z.enum(['true', 'false', 'all']).optional().default('all'),
});
/**
 * Create Tag Request
 */
export const CreateTagRequestSchema = z.object({
    name: z.string().min(1, 'Tag name is required').max(50, 'Tag name too long'),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').default('#6B7280'),
    description: z.string().max(200, 'Description too long').optional(),
});
/**
 * Update Tag Request
 */
export const UpdateTagRequestSchema = z.object({
    name: z.string().min(1, 'Tag name is required').max(50, 'Tag name too long').optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional(),
    description: z.string().max(200, 'Description too long').optional(),
});
//# sourceMappingURL=comment.schema.js.map