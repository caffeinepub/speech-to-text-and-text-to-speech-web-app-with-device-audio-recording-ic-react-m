import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type TranscriptEntry = {
    timestamp : Time.Time;
    text : Text;
  };

  type UserTranscripts = {
    entries : List.List<TranscriptEntry>;
  };

  // Storage for user profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Storage for user transcripts
  let usersTranscripts = Map.empty<Principal, UserTranscripts>();

  // User Profile Functions (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Transcription Functions
  public shared ({ caller }) func saveTranscriptionEntry(text : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save transcripts");
    };

    let newEntry = {
      timestamp = Time.now();
      text;
    };

    let entries = switch (usersTranscripts.get(caller)) {
      case (null) {
        List.fromArray<{ timestamp : Time.Time; text : Text }>([newEntry]);
      };
      case (?userTranscripts) {
        List.fromArray<{ timestamp : Time.Time; text : Text }>(
          userTranscripts.entries.toArray().concat([newEntry])
        );
      };
    };

    usersTranscripts.add(caller, { entries });
  };

  public query ({ caller }) func getTranscriptionHistory() : async [TranscriptEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view history");
    };

    switch (usersTranscripts.get(caller)) {
      case (null) { [] };
      case (?userTranscripts) { userTranscripts.entries.toArray() };
    };
  };

  public query ({ caller }) func getAllTranscriptionHistories() : async [(Principal, [TranscriptEntry])] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all histories");
    };

    usersTranscripts.toArray().map<(Principal, UserTranscripts), (Principal, [TranscriptEntry])>(
      func((principal, userTranscripts)) {
        (principal, userTranscripts.entries.toArray());
      }
    );
  };
};
