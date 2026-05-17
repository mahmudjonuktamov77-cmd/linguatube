import Common "../types/common";
import UserTypes "../types/user";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Int "mo:core/Int";

module {
  public type UserProfile = UserTypes.UserProfile;

  let adminEmail = "mahmudjonuktamov77@gmail.com";

  func defaultProfile(caller : Common.UserId) : UserTypes.UserProfile {
    {
      id = caller;
      var displayName = "";
      var language : Common.Language = #Uzbek;
      var email = "";
      var profileImage = "";
      var points : Int = 0;
      var streak : Nat = 0;
      createdAt = Time.now();
    };
  };

  func ensureProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
  ) : UserTypes.UserProfile {
    switch (profiles.get(caller)) {
      case (?p) { p };
      case null {
        let p = defaultProfile(caller);
        profiles.add(caller, p);
        p;
      };
    };
  };

  func toPublic(p : UserTypes.UserProfile) : UserTypes.PublicUserProfile {
    {
      id = p.id;
      displayName = p.displayName;
      language = p.language;
      email = p.email;
      profileImage = p.profileImage;
      points = p.points;
      streak = p.streak;
      createdAt = p.createdAt;
    };
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
  ) : ?UserTypes.PublicUserProfile {
    switch (profiles.get(caller)) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func setLanguagePreference(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    language : Common.Language,
  ) : () {
    let p = ensureProfile(profiles, caller);
    p.language := language;
  };

  public func setDisplayName(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    displayName : Text,
  ) : () {
    let p = ensureProfile(profiles, caller);
    p.displayName := displayName;
  };

  public func setEmail(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    email : Text,
  ) : () {
    let p = ensureProfile(profiles, caller);
    p.email := email;
  };

  public func setProfileImage(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    imageUrl : Text,
  ) : () {
    let p = ensureProfile(profiles, caller);
    p.profileImage := imageUrl;
  };

  public func updateUserPoints(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    points : Int,
  ) : () {
    let p = ensureProfile(profiles, caller);
    p.points := p.points + points;
  };

  public func updateUserStreak(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Common.UserId,
    streak : Nat,
  ) : () {
    let p = ensureProfile(profiles, caller);
    p.streak := streak;
  };

  public func getIsAdmin(email : Text) : Bool {
    email == adminEmail;
  };

  public func getLeaderboard(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  ) : [UserTypes.PublicUserProfile] {
    let all = List.empty<UserTypes.PublicUserProfile>();
    for ((_, p) in profiles.entries()) {
      all.add(toPublic(p));
    };
    let arr = all.toArray();
    let sorted = arr.sort(func(a, b) { Int.compare(b.points, a.points) });
    if (sorted.size() <= 50) { sorted } else {
      sorted.sliceToArray(0, 50);
    };
  };

  public func getAllUsers(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  ) : [UserTypes.PublicUserProfile] {
    let all = List.empty<UserTypes.PublicUserProfile>();
    for ((_, p) in profiles.entries()) {
      all.add(toPublic(p));
    };
    all.toArray();
  };
};
