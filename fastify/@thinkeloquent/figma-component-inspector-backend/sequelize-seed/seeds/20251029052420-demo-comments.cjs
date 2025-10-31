'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Insert demo comments
    await queryInterface.bulkInsert('comments', [
      {
        id: 1,
        file_id: 'demo-file-001',
        node_id: 'component-123',
        user_id: 'user-001',
        user_name: 'John Doe',
        user_avatar: 'https://example.com/avatar1.jpg',
        text: 'This component needs better spacing between elements',
        priority: 'high',
        resolved: false,
        position_x: 100.5,
        position_y: 200.75,
        timestamp: now,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        file_id: 'demo-file-001',
        node_id: 'component-456',
        user_id: 'user-002',
        user_name: 'Jane Smith',
        user_avatar: 'https://example.com/avatar2.jpg',
        text: 'Consider using our standard color palette here',
        priority: 'normal',
        resolved: false,
        position_x: 300.0,
        position_y: 150.25,
        timestamp: now,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        file_id: 'demo-file-002',
        node_id: null,
        user_id: 'user-001',
        user_name: 'John Doe',
        user_avatar: 'https://example.com/avatar1.jpg',
        text: 'General feedback: Great work on this design!',
        priority: 'low',
        resolved: true,
        position_x: null,
        position_y: null,
        timestamp: now,
        created_at: now,
        updated_at: now
      }
    ], {});

    // Insert demo comment replies
    await queryInterface.bulkInsert('comment_replies', [
      {
        id: 1,
        comment_id: 1,
        user_id: 'user-002',
        user_name: 'Jane Smith',
        user_avatar: 'https://example.com/avatar2.jpg',
        text: 'I agree, let me adjust the padding',
        timestamp: now,
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        comment_id: 1,
        user_id: 'user-003',
        user_name: 'Bob Wilson',
        user_avatar: null,
        text: 'Also check the margin on mobile view',
        timestamp: now,
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        comment_id: 2,
        user_id: 'user-001',
        user_name: 'John Doe',
        user_avatar: 'https://example.com/avatar1.jpg',
        text: 'Good catch! I will update the colors',
        timestamp: now,
        created_at: now,
        updated_at: now
      }
    ], {});

    // Update sequence counters for PostgreSQL
    await queryInterface.sequelize.query(
      "SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments));"
    );
    await queryInterface.sequelize.query(
      "SELECT setval('comment_replies_id_seq', (SELECT MAX(id) FROM comment_replies));"
    );
  },

  async down (queryInterface, Sequelize) {
    // Delete in reverse order due to foreign key constraints
    await queryInterface.bulkDelete('comment_replies', null, {});
    await queryInterface.bulkDelete('comments', null, {});
  }
};
