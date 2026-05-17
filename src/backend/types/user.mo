import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    var displayName : Text;
    var language : Common.Language;
    var email : Text;
    var profileImage : Text;
    var points : Int;
    var streak : Nat;
    createdAt : Common.Timestamp;
  };

  public type PublicUserProfile = {
    id : Common.UserId;
    displayName : Text;
    language : Common.Language;
    email : Text;
    profileImage : Text;
    points : Int;
    streak : Nat;
    createdAt : Common.Timestamp;
  };
};
