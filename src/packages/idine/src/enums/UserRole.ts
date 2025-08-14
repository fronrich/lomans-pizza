enum UserRole {
  /**
   * This role is only used when someone has created
   * a reservation but has not confirmed their identity yet
   */
  TEMPORARY,
  GUEST,
  MEMBER,
}

export default UserRole;
