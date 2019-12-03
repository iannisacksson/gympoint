module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'age', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'age');
  },
};
