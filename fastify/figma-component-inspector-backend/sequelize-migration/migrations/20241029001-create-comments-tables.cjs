'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create comments table
    await queryInterface.createTable('figma_component_inspector_comments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      file_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      node_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resolved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      position_x: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      position_y: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create indexes for comments
    await queryInterface.addIndex('figma_component_inspector_comments', ['file_id'], {
      name: 'fci_comments_file_id_idx',
    });
    await queryInterface.addIndex('figma_component_inspector_comments', ['node_id'], {
      name: 'fci_comments_node_id_idx',
    });
    await queryInterface.addIndex('figma_component_inspector_comments', ['file_id', 'node_id'], {
      name: 'fci_comments_file_id_node_id_idx',
    });
    await queryInterface.addIndex('figma_component_inspector_comments', ['resolved'], {
      name: 'fci_comments_resolved_idx',
    });

    // Create comment_replies table
    await queryInterface.createTable('figma_component_inspector_comment_replies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      comment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'figma_component_inspector_comments',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create index for comment_replies
    await queryInterface.addIndex('figma_component_inspector_comment_replies', ['comment_id'], {
      name: 'fci_comment_replies_comment_id_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order due to foreign key constraints
    await queryInterface.dropTable('figma_component_inspector_comment_replies');
    await queryInterface.dropTable('figma_component_inspector_comments');
  }
};