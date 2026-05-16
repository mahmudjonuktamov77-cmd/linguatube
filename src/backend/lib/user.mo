import Common "../types/common";
import UserTypes "../types/user";
import Map "mo:core/Map";

module {
  public type UserProfile = UserTypes.UserProfile;

  public func getProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
  ) : ?{
    id : Common.UserId;
    displayName : Text;
    language : Common.Language;
  } {
    switch (profiles.get(caller)) {
      case (?p) { ?{ id = p.id; displayName = p.displayName; language = p.language } };
      case null { null };
    };
  };

  public func setLanguagePreference(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    language : Common.Language,
  ) : () {
    switch (profiles.get(caller)) {
      case (?p) { p.language := language };
      case null {
        profiles.add(caller, { id = caller; var displayName = ""; var language });
      };
    };
  };

  public func setDisplayName(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    displayName : Text,
  ) : () {
    switch (profiles.get(caller)) {
      case (?p) { p.displayName := displayName };
      case null {
        profiles.add(caller, { id = caller; var displayName; var language : Common.Language = #Uzbek });
      };
    };
  };
};
