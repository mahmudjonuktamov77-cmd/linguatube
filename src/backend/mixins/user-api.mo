import Common "../types/common";
import UserTypes "../types/user";
import Map "mo:core/Map";
import UserLib "../lib/user";

mixin (
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
) {
  public shared query ({ caller }) func getUserProfile() : async ?UserTypes.PublicUserProfile {
    UserLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func setLanguagePreference(language : Common.Language) : async () {
    UserLib.setLanguagePreference(profiles, caller, language);
  };

  public shared ({ caller }) func setDisplayName(displayName : Text) : async () {
    UserLib.setDisplayName(profiles, caller, displayName);
  };

  public shared ({ caller }) func setEmail(email : Text) : async () {
    UserLib.setEmail(profiles, caller, email);
  };

  public shared ({ caller }) func setProfileImage(imageUrl : Text) : async () {
    UserLib.setProfileImage(profiles, caller, imageUrl);
  };

  public shared ({ caller }) func updateUserPoints(points : Int) : async () {
    UserLib.updateUserPoints(profiles, caller, points);
  };

  public shared ({ caller }) func updateUserStreak(streak : Nat) : async () {
    UserLib.updateUserStreak(profiles, caller, streak);
  };

  public shared query func getIsAdmin(email : Text) : async Bool {
    UserLib.getIsAdmin(email);
  };

  public shared query func getLeaderboard() : async [UserTypes.PublicUserProfile] {
    UserLib.getLeaderboard(profiles);
  };

  public shared query func getAllUsers() : async [UserTypes.PublicUserProfile] {
    UserLib.getAllUsers(profiles);
  };
};
