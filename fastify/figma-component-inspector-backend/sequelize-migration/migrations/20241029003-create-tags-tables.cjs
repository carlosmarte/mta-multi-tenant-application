'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create comment_tags table
    await queryInterface.createTable('figma_component_inspector_comment_tags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      color: {
        type: Sequelize.STRING(7), // Hex color code like #FF5733
        allowNull: false,
        defaultValue: '#6B7280', // Default gray color
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    // Create comment_tag_assignments table (many-to-many junction)
    await queryInterface.createTable('figma_component_inspector_comment_tag_assignments', {
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
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'figma_component_inspector_comment_tags',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

    // Create indexes for efficient querying
    await queryInterface.addIndex('figma_component_inspector_comment_tags', ['name'], {
      name: 'fci_comment_tags_name_idx',
    });

    await queryInterface.addIndex('figma_component_inspector_comment_tag_assignments', ['comment_id'], {
      name: 'fci_comment_tag_assignments_comment_id_idx',
    });

    await queryInterface.addIndex('figma_component_inspector_comment_tag_assignments', ['tag_id'], {
      name: 'fci_comment_tag_assignments_tag_id_idx',
    });

    // Ensure unique combinations of comment_id and tag_id
    await queryInterface.addIndex('figma_component_inspector_comment_tag_assignments', ['comment_id', 'tag_id'], {
      name: 'fci_comment_tag_assignments_unique',
      unique: true,
    });

    // Insert default tags
    await queryInterface.bulkInsert('figma_component_inspector_comment_tags', [
      {
        name: 'Bug',
        color: '#EF4444',
        description: 'Issues or bugs found in the design',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Feature',
        color: '#3B82F6',
        description: 'Feature requests or suggestions',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'UI',
        color: '#A855F7',
        description: 'UI/UX related feedback',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Question',
        color: '#EAB308',
        description: 'Questions about the design',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Resolved',
        color: '#22C55E',
        description: 'Resolved issues',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'High Priority',
        color: '#DC2626',
        description: 'High priority items',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order due to foreign key constraints
    await queryInterface.dropTable('figma_component_inspector_comment_tag_assignments');
    await queryInterface.dropTable('figma_component_inspector_comment_tags');
  }
};