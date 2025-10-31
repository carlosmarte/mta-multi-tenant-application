/**
 * Comment Schema Contracts
 *
 * Zod validation schemas for comment and annotation types.
 */
import { z } from 'zod';
/**
 * Comment Type
 */
export declare const CommentTypeSchema: z.ZodEnum<["text", "link"]>;
/**
 * Comment Priority
 */
export declare const CommentPrioritySchema: z.ZodEnum<["high", "normal", "low"]>;
/**
 * Comment Tag
 */
export declare const CommentTagSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    color: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    color: string;
    description?: string | undefined;
}, {
    id: number;
    name: string;
    color: string;
    description?: string | undefined;
}>;
/**
 * Comment Reply
 */
export declare const CommentReplySchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodString;
    userName: z.ZodString;
    userAvatar: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    timestamp: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    userName: string;
    text: string;
    userAvatar?: string | undefined;
}, {
    id: number;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    userName: string;
    text: string;
    userAvatar?: string | undefined;
}>;
/**
 * Comment Position (for pinned comments)
 */
export declare const CommentPositionSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    x: number;
    y: number;
}, {
    x: number;
    y: number;
}>;
/**
 * Comment
 */
export declare const CommentSchema: z.ZodObject<{
    id: z.ZodNumber;
    fileId: z.ZodString;
    nodeId: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
    userName: z.ZodString;
    userAvatar: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["text", "link"]>>;
    priority: z.ZodOptional<z.ZodEnum<["high", "normal", "low"]>>;
    resolved: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
    timestamp: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    replies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        userId: z.ZodString;
        userName: z.ZodString;
        userAvatar: z.ZodOptional<z.ZodString>;
        text: z.ZodString;
        timestamp: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        timestamp: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        userName: string;
        text: string;
        userAvatar?: string | undefined;
    }, {
        id: number;
        timestamp: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        userName: string;
        text: string;
        userAvatar?: string | undefined;
    }>, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        color: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        color: string;
        description?: string | undefined;
    }, {
        id: number;
        name: string;
        color: string;
        description?: string | undefined;
    }>, "many">>;
    replyCount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: number;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    userName: string;
    text: string;
    type: "text" | "link";
    resolved: boolean;
    fileId: string;
    userAvatar?: string | undefined;
    nodeId?: string | undefined;
    priority?: "high" | "normal" | "low" | undefined;
    replies?: {
        id: number;
        timestamp: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        userName: string;
        text: string;
        userAvatar?: string | undefined;
    }[] | undefined;
    tags?: {
        id: number;
        name: string;
        color: string;
        description?: string | undefined;
    }[] | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
    replyCount?: number | undefined;
}, {
    id: number;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    userName: string;
    text: string;
    fileId: string;
    userAvatar?: string | undefined;
    type?: "text" | "link" | undefined;
    nodeId?: string | undefined;
    priority?: "high" | "normal" | "low" | undefined;
    resolved?: boolean | undefined;
    replies?: {
        id: number;
        timestamp: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        userName: string;
        text: string;
        userAvatar?: string | undefined;
    }[] | undefined;
    tags?: {
        id: number;
        name: string;
        color: string;
        description?: string | undefined;
    }[] | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
    replyCount?: number | undefined;
}>;
/**
 * Create Comment Request
 */
export declare const CreateCommentRequestSchema: z.ZodObject<{
    fileId: z.ZodString;
    nodeId: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
    userName: z.ZodString;
    userAvatar: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["text", "link"]>>>;
    priority: z.ZodOptional<z.ZodEnum<["high", "normal", "low"]>>;
    position: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
    tagIds: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    userName: string;
    text: string;
    type: "text" | "link";
    fileId: string;
    userAvatar?: string | undefined;
    nodeId?: string | undefined;
    priority?: "high" | "normal" | "low" | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
    tagIds?: number[] | undefined;
}, {
    userId: string;
    userName: string;
    text: string;
    fileId: string;
    userAvatar?: string | undefined;
    type?: "text" | "link" | undefined;
    nodeId?: string | undefined;
    priority?: "high" | "normal" | "low" | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
    tagIds?: number[] | undefined;
}>;
/**
 * Update Comment Request
 */
export declare const UpdateCommentRequestSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["text", "link"]>>;
    priority: z.ZodOptional<z.ZodEnum<["high", "normal", "low"]>>;
    resolved: z.ZodOptional<z.ZodBoolean>;
    position: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
    tagIds: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
    type?: "text" | "link" | undefined;
    priority?: "high" | "normal" | "low" | undefined;
    resolved?: boolean | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
    tagIds?: number[] | undefined;
}, {
    text?: string | undefined;
    type?: "text" | "link" | undefined;
    priority?: "high" | "normal" | "low" | undefined;
    resolved?: boolean | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
    tagIds?: number[] | undefined;
}>;
/**
 * Create Comment Reply Request
 */
export declare const CreateCommentReplyRequestSchema: z.ZodObject<{
    userId: z.ZodString;
    userName: z.ZodString;
    userAvatar: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    userName: string;
    text: string;
    userAvatar?: string | undefined;
}, {
    userId: string;
    userName: string;
    text: string;
    userAvatar?: string | undefined;
}>;
/**
 * Get Comments Query
 */
export declare const GetCommentsQuerySchema: z.ZodObject<{
    fileId: z.ZodString;
    nodeId: z.ZodOptional<z.ZodString>;
    resolved: z.ZodDefault<z.ZodOptional<z.ZodEnum<["true", "false", "all"]>>>;
}, "strip", z.ZodTypeAny, {
    resolved: "true" | "false" | "all";
    fileId: string;
    nodeId?: string | undefined;
}, {
    fileId: string;
    nodeId?: string | undefined;
    resolved?: "true" | "false" | "all" | undefined;
}>;
/**
 * Create Tag Request
 */
export declare const CreateTagRequestSchema: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodDefault<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    color: string;
    description?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    color?: string | undefined;
}>;
/**
 * Update Tag Request
 */
export declare const UpdateTagRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
}, {
    description?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
}>;
/**
 * Type Exports
 */
export type CommentType = z.infer<typeof CommentTypeSchema>;
export type CommentPriority = z.infer<typeof CommentPrioritySchema>;
export type CommentTag = z.infer<typeof CommentTagSchema>;
export type CommentReply = z.infer<typeof CommentReplySchema>;
export type CommentPosition = z.infer<typeof CommentPositionSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type CreateCommentRequest = z.infer<typeof CreateCommentRequestSchema>;
export type UpdateCommentRequest = z.infer<typeof UpdateCommentRequestSchema>;
export type CreateCommentReplyRequest = z.infer<typeof CreateCommentReplyRequestSchema>;
export type GetCommentsQuery = z.infer<typeof GetCommentsQuerySchema>;
export type CreateTagRequest = z.infer<typeof CreateTagRequestSchema>;
export type UpdateTagRequest = z.infer<typeof UpdateTagRequestSchema>;
//# sourceMappingURL=comment.schema.d.ts.map