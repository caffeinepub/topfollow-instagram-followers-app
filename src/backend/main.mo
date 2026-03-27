import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  type User = {
    username : Text;
    email : ?Text;
  };

  type Review = {
    username : Text;
    rating : Nat;
    reviewText : Text;
    timestamp : Int;
  };

  module Review {
    public func compare(review1 : Review, review2 : Review) : Order.Order {
      Int.compare(review2.timestamp, review1.timestamp);
    };
  };

  let users = Map.empty<Principal, User>();
  let reviews = Map.empty<Nat, Review>();
  var nextReviewId = 0;
  var downloadCount = 0;

  public shared ({ caller }) func register(username : Text, email : ?Text) : async Text {
    if (users.containsKey(caller)) { Runtime.trap("User already registered") };
    if (Text.equal(username, "")) {
      Runtime.trap("Username cannot be empty");
    };

    let user : User = {
      username;
      email;
    };

    users.add(caller, user);
    "Registration successful";
  };

  public shared ({ caller }) func submitReview(rating : Nat, reviewText : Text) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    switch (users.get(caller)) {
      case (null) { Runtime.trap("User not registered") };
      case (?user) {
        let review : Review = {
          username = user.username;
          rating;
          reviewText;
          timestamp = Time.now();
        };
        reviews.add(nextReviewId, review);
        nextReviewId += 1;
      };
    };
  };

  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.values().toArray().sort();
  };

  public query ({ caller }) func getAverageRating() : async ?Float {
    let totalReviews = reviews.size();
    if (totalReviews == 0) {
      return null;
    };
    let sum = reviews.values().foldLeft(
      0,
      func(acc, review) { acc + review.rating },
    );
    ?(sum.toFloat() / totalReviews.toFloat());
  };

  public shared ({ caller }) func incrementDownloadCount() : async Nat {
    downloadCount += 1;
    downloadCount;
  };

  public query ({ caller }) func isRegistered() : async Bool {
    users.containsKey(caller);
  };
};
