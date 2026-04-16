import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/gamelinks";
import GameLinksLib "../lib/gamelinks";

mixin (
  accessControlState : AccessControl.AccessControlState,
  gameLinks : List.List<Types.GameLink>,
  nextGameLinkId : [var Nat],
  seeded : [var Bool],
) {
  // Seed sample data on first deploy if storage is empty
  if (not seeded[0]) {
    let seedPrincipal = Principal.fromText("2vxsx-fae");
    let now = Time.now();
    nextGameLinkId[0] := GameLinksLib.seedSampleData(gameLinks, nextGameLinkId[0], seedPrincipal, now);
    seeded[0] := true;
  };

  public shared ({ caller }) func addGameLink(req : Types.CreateGameLinkRequest) : async Types.GameLink {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can add game links");
    };
    let id = nextGameLinkId[0];
    nextGameLinkId[0] += 1;
    let now = Time.now();
    GameLinksLib.add(gameLinks, id, req, caller, now);
  };

  public shared ({ caller }) func updateGameLink(id : Types.GameLinkId, req : Types.UpdateGameLinkRequest) : async Types.GameLink {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can update game links");
    };
    let now = Time.now();
    GameLinksLib.update(gameLinks, id, req, caller, now);
  };

  public shared ({ caller }) func deleteGameLink(id : Types.GameLinkId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can delete game links");
    };
    GameLinksLib.remove(gameLinks, id, caller);
  };

  public query func listGameLinks() : async [Types.GameLink] {
    GameLinksLib.listSortedByDate(gameLinks);
  };

  public query func searchGameLinks(term : Text) : async [Types.GameLink] {
    GameLinksLib.search(gameLinks, term);
  };

  public query func getGameLink(id : Types.GameLinkId) : async ?Types.GameLink {
    GameLinksLib.getById(gameLinks, id);
  };
};
