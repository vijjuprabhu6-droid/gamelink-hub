import List "mo:core/List";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/gamelinks";

module {
  public type GameLinkList = List.List<Types.GameLink>;

  public func nextId(gameLinks : GameLinkList, currentId : Nat) : Nat {
    currentId + 1;
  };

  public func add(
    gameLinks : GameLinkList,
    id : Nat,
    req : Types.CreateGameLinkRequest,
    caller : Principal,
    now : Int,
  ) : Types.GameLink {
    let link : Types.GameLink = {
      id;
      title = req.title;
      description = req.description;
      image = req.image;
      url = req.url;
      submittedBy = caller;
      submittedAt = now;
      updatedAt = now;
    };
    gameLinks.add(link);
    link;
  };

  public func update(
    gameLinks : GameLinkList,
    id : Types.GameLinkId,
    req : Types.UpdateGameLinkRequest,
    caller : Principal,
    now : Int,
  ) : Types.GameLink {
    var found : ?Types.GameLink = null;
    gameLinks.mapInPlace(func(link) {
      if (link.id == id) {
        if (not Principal.equal(link.submittedBy, caller)) {
          Runtime.trap("Unauthorized: You can only edit your own submissions");
        };
        let updated = { link with
          title = req.title;
          description = req.description;
          image = req.image;
          url = req.url;
          updatedAt = now;
        };
        found := ?updated;
        updated;
      } else {
        link;
      }
    });
    switch (found) {
      case (?link) link;
      case null Runtime.trap("Game link not found");
    };
  };

  public func remove(
    gameLinks : GameLinkList,
    id : Types.GameLinkId,
    caller : Principal,
  ) {
    let existing = gameLinks.find(func(link) { link.id == id });
    switch (existing) {
      case null Runtime.trap("Game link not found");
      case (?link) {
        if (not Principal.equal(link.submittedBy, caller)) {
          Runtime.trap("Unauthorized: You can only delete your own submissions");
        };
      };
    };
    let filtered = gameLinks.filter(func(link) { link.id != id });
    gameLinks.clear();
    gameLinks.append(filtered);
  };

  public func listSortedByDate(gameLinks : GameLinkList) : [Types.GameLink] {
    let arr = gameLinks.toArray();
    arr.sort(func(a, b) { Int.compare(b.submittedAt, a.submittedAt) });
  };

  public func search(gameLinks : GameLinkList, term : Text) : [Types.GameLink] {
    let lower = term.toLower();
    let filtered = gameLinks.filter(func(link) {
      link.title.toLower().contains(#text lower) or
      link.description.toLower().contains(#text lower)
    });
    let arr = filtered.toArray();
    arr.sort(func(a, b) { Int.compare(b.submittedAt, a.submittedAt) });
  };

  public func getById(gameLinks : GameLinkList, id : Types.GameLinkId) : ?Types.GameLink {
    gameLinks.find(func(link) { link.id == id });
  };

  public func seedSampleData(
    gameLinks : GameLinkList,
    startId : Nat,
    seedPrincipal : Principal,
    now : Int,
  ) : Nat {
    // Sample 1: Hades on Steam
    let hades : Types.GameLink = {
      id = startId;
      title = "Hades";
      description = "A rogue-like dungeon crawler where you defy the god of the dead as you hack and slash your way out of the Underworld. Available on Steam.";
      image = "" : Storage.ExternalBlob;
      url = "https://store.steampowered.com/app/1145360/Hades/";
      submittedBy = seedPrincipal;
      submittedAt = now;
      updatedAt = now;
    };

    // Sample 2: Celeste on itch.io
    let celeste : Types.GameLink = {
      id = startId + 1;
      title = "Celeste";
      description = "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain in this challenging platformer. Available on itch.io.";
      image = "" : Storage.ExternalBlob;
      url = "https://mattmakesgames.itch.io/celeste";
      submittedBy = seedPrincipal;
      submittedAt = now - 1000;
      updatedAt = now - 1000;
    };

    // Sample 3: Fortnite on Epic Games
    let fortnite : Types.GameLink = {
      id = startId + 2;
      title = "Fortnite";
      description = "A free-to-play Battle Royale game with numerous game modes. Play for free on Epic Games.";
      image = "" : Storage.ExternalBlob;
      url = "https://www.epicgames.com/fortnite/en-US/home";
      submittedBy = seedPrincipal;
      submittedAt = now - 2000;
      updatedAt = now - 2000;
    };

    gameLinks.add(hades);
    gameLinks.add(celeste);
    gameLinks.add(fortnite);

    startId + 3;
  };
};
