import { Sequelize } from 'sequelize';
import { initCommentModel } from './models/Comment.js';
import { initCommentReplyModel } from './models/CommentReply.js';
import { initCommentTagModel } from './models/CommentTag.js';
import { initCommentTagAssignmentModel } from './models/CommentTagAssignment.js';
import { setupAssociations } from './associations.js';
export async function createFigmaInspectorSequelize(options) {
    const { databaseUrl, logger, enableQueryLogging = false } = options;
    // Check if SSL mode is enabled
    const sslMode = process.env.POSTGRES_SSLMODE;
    const useSSL = sslMode === 'true' || sslMode === 'require' || sslMode === 'verify-ca' || sslMode === 'verify-full';
    if (useSSL) {
        logger?.info(`[Figma Inspector DB] SSL mode enabled: ${sslMode}`);
    }
    // Create Sequelize instance
    const sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        logging: enableQueryLogging && logger ? (msg) => logger.info(msg) : false,
        ...(useSSL && {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false, // Set to true for production with valid certificates
                },
            },
        }),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            // Global model options
            freezeTableName: true, // Use singular table names
        },
    });
    // Initialize models
    const CommentModel = initCommentModel(sequelize);
    const CommentReplyModel = initCommentReplyModel(sequelize);
    const CommentTagModel = initCommentTagModel(sequelize);
    const CommentTagAssignmentModel = initCommentTagAssignmentModel(sequelize);
    // Setup associations
    setupAssociations();
    // Test connection
    try {
        await sequelize.authenticate();
        logger?.info('Figma Inspector Sequelize connection established successfully');
    }
    catch (error) {
        logger?.error(`Unable to connect to database: ${error}`);
        throw error;
    }
    const models = {
        Comment: CommentModel,
        CommentReply: CommentReplyModel,
        CommentTag: CommentTagModel,
        CommentTagAssignment: CommentTagAssignmentModel,
    };
    return {
        sequelize,
        models,
        disconnect: async () => {
            await sequelize.close();
        },
    };
}
// Factory pattern similar to the Prisma implementation
export function createFigmaInspectorSequelizeFactory(appName, options) {
    return async (config) => {
        const { sequelize, models, disconnect } = await createFigmaInspectorSequelize({
            databaseUrl: config.databaseUrl,
            logger: config.logger,
            enableQueryLogging: options?.enableQueryLogging || process.env.NODE_ENV === 'development',
        });
        return {
            client: models,
            disconnect,
        };
    };
}
// Export models and types for convenience
export { Comment, CommentReply, CommentTag, CommentTagAssignment } from './models/index.js';
//# sourceMappingURL=index.js.map