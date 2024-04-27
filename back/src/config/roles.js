const allRoles = {
  user: ['getUsers'],
  lector: ['read'],
  creador: ['create', 'read', 'update'],
  admin: ['create', 'read', 'update', 'delete', 'getUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
