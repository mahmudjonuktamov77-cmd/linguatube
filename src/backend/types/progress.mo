import Common "common";

module {
  public type WatchedVideo = {
    videoId : Common.VideoId;
    watchedAt : Common.Timestamp;
  };

  public type QuizResult = {
    id : Nat;
    videoId : Common.VideoId;
    score : Nat;
    correctAnswers : Nat;
    totalQuestions : Nat;
    takenAt : Common.Timestamp;
  };
};
