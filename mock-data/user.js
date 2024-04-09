use admin;

// Crear usuario con los permisos necesarios
db.createUser({
  user: "lepique_database_desarrollador",
  pwd: "lepique_database_desarrollador",
  roles: [
    { role: "readWrite", db: "lepique_database_desarrollador" },
    { role: "dbOwner", db: "lepique_database_desarrollador" },
    { role: "readWriteAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" },
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "clusterAdmin", db: "admin" }
  ]
});