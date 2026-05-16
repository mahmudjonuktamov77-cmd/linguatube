import Common "types/common";
import UserTypes "types/user";
import VocabTypes "types/vocabulary";
import ProgressTypes "types/progress";
import Map "mo:core/Map";
import List "mo:core/List";

import UserApiMixin "mixins/user-api";
import VocabApiMixin "mixins/vocabulary-api";
import ProgressApiMixin "mixins/progress-api";

actor {
  let profiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let vocabEntries = Map.empty<Common.UserId, List.List<VocabTypes.VocabEntry>>();
  let vocabState = { var nextVocabId : Nat = 0 };
  let watchedVideos = Map.empty<Common.UserId, List.List<ProgressTypes.WatchedVideo>>();
  let quizResults = Map.empty<Common.UserId, List.List<ProgressTypes.QuizResult>>();
  let quizState = { var nextQuizId : Nat = 0 };

  include UserApiMixin(profiles);
  include VocabApiMixin(vocabEntries, vocabState);
  include ProgressApiMixin(watchedVideos, quizResults, quizState);
};

