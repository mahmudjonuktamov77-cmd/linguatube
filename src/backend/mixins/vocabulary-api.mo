import Common "../types/common";
import VocabTypes "../types/vocabulary";
import Map "mo:core/Map";
import List "mo:core/List";
import VocabLib "../lib/vocabulary";

mixin (
  vocabEntries : Map.Map<Common.UserId, List.List<VocabTypes.VocabEntry>>,
  vocabState : { var nextVocabId : Nat },
) {
  public shared query ({ caller }) func getVocabulary() : async [VocabTypes.VocabEntry] {
    VocabLib.getVocabulary(vocabEntries, caller);
  };

  public shared ({ caller }) func saveVocabularyWord(
    englishText : Text,
    translationText : Text,
    sourceVideoId : Common.VideoId,
  ) : async () {
    VocabLib.saveVocabularyWord(vocabEntries, vocabState, caller, englishText, translationText, sourceVideoId);
  };
};
