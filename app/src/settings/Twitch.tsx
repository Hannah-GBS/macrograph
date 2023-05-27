import { createSignal, For, Match, Switch } from "solid-js";
import { twitch } from "@macrograph/packages";
import { Maybe, Some } from "@macrograph/core";
import { Button } from "./ui";
import { rspc } from "~/rspc";
import {
  setReadUserId,
  setWriteUserId,
} from "~/../../packages/src/twitch/chat";
import { setUserId } from "~/../../packages/src/twitch/helix";

export default () => {
  const [loggingIn, setLoggingIn] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal(Date.now());
  const { helix, chat, auth } = twitch;

  setInterval(() => {
    setCurrentTime(Date.now());
  }, 1000);

  return (
    <>
      <Switch>
        <Match when={Object.keys(auth.tokens).length !== 0}>
          <table class="mb-2 table-auto">
            <thead>
              <tr>
                <th class="pr-2 text-left">Account</th>
                <th class="px-2 text-center content-center align-middle">
                  Helix Api
                </th>
                <th class="px-2 text-center content-center align-middle">
                  Chat Account
                </th>
                <th class="px-2 text-center content-center align-middle">
                  Chat Channel
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={Object.values(twitch.auth.tokens)}>
                {(token) => (
                  <tr>
                    <td>{token.userName}</td>
                    <td class="text-center content-center align-middle">
                      <input
                        type="radio"
                        id="helix"
                        checked={twitch.helix
                          .userId()
                          .map((id) => id === token.userId)
                          .unwrapOr(false)}
                        onChange={async (r) => {
                          if (r.target.checked) {
                            helix.setUserId(Some(token.userId));
                          }
                        }}
                      />
                    </td>
                    <td class="text-center content-center align-middle">
                      <input
                        type="radio"
                        id="Chat Read"
                        checked={chat
                          .readUserId()
                          .map((u) => u === token.userId)
                          .unwrapOr(false)}
                        onChange={async (r) => {
                          if (r.target.checked) {
                            chat.setReadUserId(Some(token.userId));
                          }
                        }}
                      />
                    </td>
                    <td class="text-center content-center align-middle">
                      <input
                        type="radio"
                        id="Chat Write"
                        checked={chat
                          .writeUserId()
                          .map((u) => u === token.userId)
                          .unwrapOr(false)}
                        onChange={async (r) => {
                          if (r.target.checked) {
                            chat.setWriteUserId(Some(token.userId));
                          }
                        }}
                      />
                    </td>
                    <td>
                      {" "}
                      <Button
                        onClick={async () => {
                          if (Object.keys(auth.tokens).length === 0) {
                            localStorage.removeItem(chat.CHAT_READ_USER_ID);
                            localStorage.removeItem(chat.CHAT_WRITE_USER_ID);
                            localStorage.removeItem(helix.HELIX_USER_ID);
                          } else {
                            let user = Maybe(Object.keys(auth.tokens)[0]);
                            if (token.userId === user.unwrap()) {
                              user = Maybe(Object.keys(auth.tokens)[1]);
                            }
                            console.log(user);
                            if (chat.writeUserId().unwrap() === token.userId)
                              chat.setWriteUserId(user);
                            if (chat.readUserId().unwrap() === token.userId)
                              chat.setReadUserId(user);
                            if (helix.userId().unwrap() === token.userId)
                              helix.setUserId(user);
                          }
                          auth.logOut(token.userId);
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                    <td>
                      {Math.floor(
                        (token.obtainmentTimestamp +
                          token.expiresIn * 1000 -
                          currentTime()) /
                          1000
                      )}
                      s till expiry
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Match>
      </Switch>
      <Switch>
        <Match when={loggingIn()}>
          {(_) => {
            rspc.createSubscription(() => ["auth.twitch"], {
              onData: async (m) => {
                if (typeof m === "object" && "Received" in m) {
                  const data = await auth.addUser({
                    ...m.Received,
                    obtainmentTimestamp: Date.now(),
                    userId: "",
                    userName: "",
                  });
                  console.log(Object.keys(auth.tokens).length);
                  if (Object.keys(auth.tokens).length === 1) {
                    setReadUserId(Maybe(data));
                    setWriteUserId(Maybe(data));
                    setUserId(Maybe(data));
                  }
                  setLoggingIn(false);
                }
              },
              onError: () => {
                setLoggingIn(false);
              },
            });

            return (
              <div class="flex space-x-4 items-center">
                <p>Logging in...</p>
                <Button onClick={() => setLoggingIn(false)}>Cancel</Button>
              </div>
            );
          }}
        </Match>
        <Match when={!loggingIn()}>
          <Button onClick={() => setLoggingIn(true)}>Add Account</Button>
        </Match>
      </Switch>
    </>
  );
};
