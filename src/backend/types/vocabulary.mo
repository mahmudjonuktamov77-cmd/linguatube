import Common "common";

module {
  public type VocabEntry = {
    id : Nat;
    englishText : Text;
    translationText : Text;
    sourceVideoId : Common.VideoId;
    savedAt : Common.Timestamp;
  };
};
