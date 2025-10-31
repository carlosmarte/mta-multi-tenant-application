'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add type column to comments table
    await queryInterface.addColumn('figma_component_inspector_comments', 'type', {
      type: Sequelize.ENUM('text', 'link'),
      allowNull: false,
      defaultValue: 'text',
    });

    // Add index for type column for efficient filtering
    await queryInterface.addIndex('figma_component_inspector_comments', ['type'], {
      name: 'fci_comments_type_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove index first
    await queryInterface.removeIndex('figma_component_inspector_comments', 'fci_comments_type_idx');

    // Remove column
    await queryInterface.removeColumn('figma_component_inspector_comments', 'type');

    // Drop the enum type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_figma_component_inspector_comments_type";');
  }
};