import Common "../types/common";
import UserTypes "../types/user";
import Map "mo:core/Map";
import UserLib "../lib/user";

mixin (
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
) {
  public shared query ({ caller }) func getUserProfile() : async ?{
    id : Common.UserId;
    displayName : Text;
    language : Common.Language;
  } {
    UserLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func setLanguagePreference(language : Common.Language) : async () {
    UserLib.setLanguagePreference(profiles, caller, language);
  };

  public shared ({ caller }) func setDisplayName(displayName : Text) : async () {
    UserLib.setDisplayName(profiles, caller, displayName);
  };
};
