import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import GameLinksMixin "mixins/gamelinks-api";
import Types "types/gamelinks";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinObjectStorage();

  let gameLinks = List.empty<Types.GameLink>();
  let nextGameLinkId : [var Nat] = [var 0];
  let seeded : [var Bool] = [var false];

  include GameLinksMixin(accessControlState, gameLinks, nextGameLinkId, seeded);
};
