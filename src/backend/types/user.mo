import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    var displayName : Text;
    var language : Common.Language;
  };
};
