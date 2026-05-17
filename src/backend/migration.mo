import Map "mo:core/Map";
import Time "mo:core/Time";
import UserTypes "types/user";
import Common "types/common";

module {
  // Old UserProfile shape — must include ALL fields from the current stable state
  type OldUserProfile = {
    id : Common.UserId;
    var displayName : Text;
    var language : Common.Language;
    var email : Text;
    var profileImage : Text;
    var points : Int;
    var streak : Nat;
    createdAt : Common.Timestamp;
  };

  type OldActor = {
    profiles : Map.Map<Common.UserId, OldUserProfile>;
  };

  type NewActor = {
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let profiles = old.profiles.map<Common.UserId, OldUserProfile, UserTypes.UserProfile>(
      func(_id, p) {
        {
          id = p.id;
          var displayName = p.displayName;
          var language = p.language;
          var email = p.email;
          var profileImage = p.profileImage;
          var points = p.points;
          var streak = p.streak;
          createdAt = p.createdAt;
        };
      }
    );
    { profiles };
  };
};
