import Common "../types/common";
import ProgressTypes "../types/progress";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getWatchedVideos(
    watched : Map.Map<Common.UserId, List.List<ProgressTypes.WatchedVideo>>,
    caller : Common.UserId,
  ) : [ProgressTypes.WatchedVideo] {
    switch (watched.get(caller)) {
      case (?list) { list.toArray() };
      case null { [] };
    };
  };

  public func markVideoWatched(
    watched : Map.Map<Common.UserId, List.List<ProgressTypes.WatchedVideo>>,
    caller : Common.UserId,
    videoId : Common.VideoId,
  ) : () {
    let entry : ProgressTypes.WatchedVideo = { videoId; watchedAt = Time.now() };
    switch (watched.get(caller)) {
      case (?list) { list.add(entry) };
      case null {
        let list = List.empty<ProgressTypes.WatchedVideo>();
        list.add(entry);
        watched.add(caller, list);
      };
    };
  };

  public func getQuizResults(
    results : Map.Map<Common.UserId, List.List<ProgressTypes.QuizResult>>,
    caller : Common.UserId,
  ) : [ProgressTypes.QuizResult] {
    switch (results.get(caller)) {
      case (?list) { list.toArray() };
      case null { [] };
    };
  };

  public func saveQuizResult(
    results : Map.Map<Common.UserId, List.List<ProgressTypes.QuizResult>>,
    state : { var nextQuizId : Nat },
    caller : Common.UserId,
    videoId : Common.VideoId,
    score : Nat,
    correctAnswers : Nat,
    totalQuestions : Nat,
  ) : () {
    let result : ProgressTypes.QuizResult = {
      id = state.nextQuizId;
      videoId;
      score;
      correctAnswers;
      totalQuestions;
      takenAt = Time.now();
    };
    state.nextQuizId += 1;
    switch (results.get(caller)) {
      case (?list) { list.add(result) };
      case null {
        let list = List.empty<ProgressTypes.QuizResult>();
        list.add(result);
        results.add(caller, list);
      };
    };
  };
};
