import Common "../types/common";
import VocabTypes "../types/vocabulary";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getVocabulary(
    entries : Map.Map<Common.UserId, List.List<VocabTypes.VocabEntry>>,
    caller : Common.UserId,
  ) : [VocabTypes.VocabEntry] {
    switch (entries.get(caller)) {
      case (?list) { list.toArray() };
      case null { [] };
    };
  };

  public func saveVocabularyWord(
    entries : Map.Map<Common.UserId, List.List<VocabTypes.VocabEntry>>,
    state : { var nextVocabId : Nat },
    caller : Common.UserId,
    englishText : Text,
    translationText : Text,
    sourceVideoId : Common.VideoId,
  ) : () {
    let entry : VocabTypes.VocabEntry = {
      id = state.nextVocabId;
      englishText;
      translationText;
      sourceVideoId;
      savedAt = Time.now();
    };
    state.nextVocabId += 1;
    switch (entries.get(caller)) {
      case (?list) { list.add(entry) };
      case null {
        let list = List.empty<VocabTypes.VocabEntry>();
        list.add(entry);
        entries.add(caller, list);
      };
    };
  };
};
