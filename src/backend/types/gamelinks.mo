import Principal "mo:core/Principal";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type GameLinkId = Nat;

  public type GameLink = {
    id : GameLinkId;
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
    url : Text;
    submittedBy : Principal;
    submittedAt : Int;
    updatedAt : Int;
  };

  public type CreateGameLinkRequest = {
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
    url : Text;
  };

  public type UpdateGameLinkRequest = {
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
    url : Text;
  };
};
