import Common "../types/common";
import ProgressTypes "../types/progress";
import Map "mo:core/Map";
import List "mo:core/List";
import ProgressLib "../lib/progress";

mixin (
  watchedVideos : Map.Map<Common.UserId, List.List<ProgressTypes.WatchedVideo>>,
  quizResults : Map.Map<Common.UserId, List.List<ProgressTypes.QuizResult>>,
  quizState : { var nextQuizId : Nat },
) {
  public shared query ({ caller }) func getWatchedVideos() : async [ProgressTypes.WatchedVideo] {
    ProgressLib.getWatchedVideos(watchedVideos, caller);
  };

  public shared ({ caller }) func markVideoWatched(videoId : Common.VideoId) : async () {
    ProgressLib.markVideoWatched(watchedVideos, caller, videoId);
  };

  public shared query ({ caller }) func getQuizResults() : async [ProgressTypes.QuizResult] {
    ProgressLib.getQuizResults(quizResults, caller);
  };

  public shared ({ caller }) func saveQuizResult(
    videoId : Common.VideoId,
    score : Nat,
    correctAnswers : Nat,
    totalQuestions : Nat,
  ) : async () {
    ProgressLib.saveQuizResult(quizResults, quizState, caller, videoId, score, correctAnswers, totalQuestions);
  };
};
