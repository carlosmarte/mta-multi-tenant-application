import { Sequelize } from 'sequelize';
import { Comment } from './models/Comment.js';
import { CommentReply } from './models/CommentReply.js';
import { CommentTag } from './models/CommentTag.js';
import { CommentTagAssignment } from './models/CommentTagAssignment.js';
export interface FigmaInspectorSequelizeOptions {
    databaseUrl: string;
    logger?: {
        info: (msg: string) => void;
        warn: (msg: string) => void;
        error: (msg: string) => void;
    };
    enableQueryLogging?: boolean;
}
export interface FigmaInspectorDb {
    Comment: typeof Comment;
    CommentReply: typeof CommentReply;
    CommentTag: typeof CommentTag;
    CommentTagAssignment: typeof CommentTagAssignment;
}
export declare function createFigmaInspectorSequelize(options: FigmaInspectorSequelizeOptions): Promise<{
    sequelize: Sequelize;
    models: FigmaInspectorDb;
    disconnect: () => Promise<void>;
}>;
export declare function createFigmaInspectorSequelizeFactory(appName: string, options?: {
    enableQueryLogging?: boolean;
    enableInfoLogging?: boolean;
}): (config: {
    databaseUrl: string;
    logger?: {
        info: (msg: string) => void;
        warn: (msg: string) => void;
        error: (msg: string) => void;
    };
}) => Promise<{
    client: FigmaInspectorDb;
    disconnect: () => Promise<void>;
}>;
export { Comment, CommentReply, CommentTag, CommentTagAssignment } from './models/index.js';
export type { CommentAttributes, CommentCreationAttributes, CommentType } from './models/Comment.js';
export type { CommentReplyAttributes, CommentReplyCreationAttributes } from './models/CommentReply.js';
export type { CommentTagAttributes, CommentTagCreationAttributes } from './models/CommentTag.js';
export type { CommentTagAssignmentAttributes, CommentTagAssignmentCreationAttributes } from './models/CommentTagAssignment.js';
//# sourceMappingURL=index.d.ts.map