export const RelationshipTypesList = {
  OneToOne: 'oneToOne',
  OneToMany: 'oneToMany',
  ManyToOne: 'manyToOne',
  ManyToMany: 'manyToMany',
} as const

export const RelationshipOnDeleteList = {
  Restrict: 'restrict',
  Cascade: 'cascade',
  SetNull: 'setNull',
} as const