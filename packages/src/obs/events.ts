//EVENTS BELOW ______________________________________________|

import { t } from "@macrograph/core";
import pkg from "./pkg";
import { obs } from "./ws";

pkg.createEventSchema({
  event: "ExitStarted",
  name: "Exit Started",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
  },
  run({ ctx }) {
    ctx.exec("exec");
  },
});

obs.on("ExitStarted", () => {
  pkg.emitEvent({ name: "ExitStarted", data: undefined });
});

//VendorEvent has object

//CustomEvent has object

pkg.createEventSchema({
  event: "CurrentSceneCollectionChanging",
  name: "Current Scene Collection Changing",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneCollectionName",
      name: "Scene Collection Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneCollectionName", data.sceneCollectionName);
    ctx.exec("exec");
  },
});

obs.on("CurrentSceneCollectionChanging", (data) => {
  pkg.emitEvent({ name: "CurrentSceneCollectionChanging", data });
});

pkg.createEventSchema({
  event: "CurrentSceneCollectionChanged",
  name: "Current Scene Collection Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneCollectionName",
      name: "Scene Collection Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneCollectionName", data.sceneCollectionName);
    ctx.exec("exec");
  },
});

obs.on("CurrentSceneCollectionChanged", (data) => {
  pkg.emitEvent({ name: "CurrentSceneCollectionChanged", data });
});

pkg.createEventSchema({
  event: "SceneCollectionListChanged",
  name: "Current Scene List Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneCollections",
      name: "Scene Collections",
      type: t.list(t.string()),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneCollections", data.sceneCollections);
    ctx.exec("exec");
  },
});

obs.on("SceneCollectionListChanged", (data) => {
  pkg.emitEvent({ name: "SceneCollectionListChanged", data });
});

pkg.createEventSchema({
  event: "CurrentProfileChanging",
  name: "Current Profile Changing",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "profileName",
      name: "Profile Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("profileName", data.profileName);
    ctx.exec("exec");
  },
});

obs.on("CurrentProfileChanging", (data) => {
  pkg.emitEvent({ name: "CurrentProfileChanging", data });
});

pkg.createEventSchema({
  event: "CurrentProfileChanged",
  name: "Current Profile Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "profileName",
      name: "Profile Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("profileName", data.profileName);
    ctx.exec("exec");
  },
});

obs.on("CurrentProfileChanged", (data) => {
  pkg.emitEvent({ name: "CurrentProfileChanged", data });
});

pkg.createEventSchema({
  event: "ProfileListChanged",
  name: "Profile List Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "profiles",
      name: "Profiles",
      type: t.list(t.string()),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("profiles", data.profiles);
    ctx.exec("exec");
  },
});

obs.on("ProfileListChanged", (data) => {
  pkg.emitEvent({ name: "ProfileListChanged", data });
});

pkg.createEventSchema({
  event: "SceneCreated",
  name: "Scene Created",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "isGroup",
      name: "Is Group",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.setOutput("isGroup", data.isGroup);
    ctx.exec("exec");
  },
});

obs.on("SceneCreated", (data) => {
  pkg.emitEvent({ name: "SceneCreated", data });
});

pkg.createEventSchema({
  event: "SceneRemoved",
  name: "Scene Removed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "isGroup",
      name: "Is Group",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.setOutput("isGroup", data.isGroup);
    ctx.exec("exec");
  },
});

obs.on("SceneRemoved", (data) => {
  pkg.emitEvent({ name: "SceneRemoved", data });
});

pkg.createEventSchema({
  event: "SceneNameChanged",
  name: "Scene Name Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "oldSceneName",
      name: "Old Scene Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("oldSceneName", data.oldSceneName);
    ctx.setOutput("sceneName", data.sceneName);
    ctx.exec("exec");
  },
});

obs.on("SceneNameChanged", (data) => {
  pkg.emitEvent({ name: "SceneNameChanged", data });
});

pkg.createEventSchema({
  event: "CurrentProgramSceneChanged",
  name: "Current Program Scene Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.exec("exec");
  },
});

obs.on("CurrentProgramSceneChanged", (data) => {
  pkg.emitEvent({ name: "CurrentProgramSceneChanged", data });
});

pkg.createEventSchema({
  event: "CurrentPreviewSceneChanged",
  name: "Current Preview Scene Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.exec("exec");
  },
});

obs.on("CurrentPreviewSceneChanged", (data) => {
  pkg.emitEvent({ name: "CurrentPreviewSceneChanged", data });
});

//has Array of Object v

// pkg.createEventSchema({
//   event: "SceneListChanged",
//   name: "Scene List Changed",
//   generateIO(io) {
//    io.execOutput({
//       id: "exec",
//       name: "",
//     });
//    io.dataOutput({
//       id: "sceneName",
//       name: "Scene Name",
//       type: types.string(),
//     });
//   },
//   run({ ctx, data }) {
//     ctx.setOutput("sceneName", data.sceneName);
//     ctx.exec("exec");
//   },
// });

// obs.on("SceneListChanged", (data) => {
//   pkg.emitEvent({ name: "SceneListChanged", data });
// });

//InputCreated has object

pkg.createEventSchema({
  event: "InputRemoved",
  name: "Input Removed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.exec("exec");
  },
});

obs.on("InputRemoved", (data) => {
  pkg.emitEvent({ name: "InputRemoved", data });
});

pkg.createEventSchema({
  event: "InputNameChanged",
  name: "Input Name Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "oldInputName",
      name: "Old Input Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("oldInputName", data.oldInputName);
    ctx.exec("exec");
  },
});

obs.on("InputNameChanged", (data) => {
  pkg.emitEvent({ name: "InputNameChanged", data });
});

pkg.createEventSchema({
  event: "InputActiveStateChanged",
  name: "Input Active State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "videoActive",
      name: "Video Active",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("videoActive", data.videoActive);
    ctx.exec("exec");
  },
});

obs.on("InputActiveStateChanged", (data) => {
  pkg.emitEvent({ name: "InputActiveStateChanged", data });
});

pkg.createEventSchema({
  event: "InputShowStateChanged",
  name: "Input Show State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "videoShowing",
      name: "Video Showing",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("videoShowing", data.videoShowing);
    ctx.exec("exec");
  },
});

obs.on("InputShowStateChanged", (data) => {
  pkg.emitEvent({ name: "InputShowStateChanged", data });
});

pkg.createEventSchema({
  event: "InputMuteStateChanged",
  name: "Input Mute State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputMuted",
      name: "Video Muted",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("inputMuted", data.inputMuted);
    ctx.exec("exec");
  },
});

obs.on("InputMuteStateChanged", (data) => {
  pkg.emitEvent({ name: "InputMuteStateChanged", data });
});

pkg.createEventSchema({
  event: "InputVolumeChanged",
  name: "Input Volume Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputVolumeMul",
      name: "Video Volume Mul",
      type: t.int(),
    });
    io.dataOutput({
      id: "inputVolumeDb",
      name: "Video Volume Db",
      type: t.int(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("inputVolumeMul", data.inputVolumeMul);
    ctx.setOutput("inputVolumeDb", data.inputVolumeDb);
    ctx.exec("exec");
  },
});

obs.on("InputVolumeChanged", (data) => {
  pkg.emitEvent({ name: "InputVolumeChanged", data });
});

pkg.createEventSchema({
  event: "InputAudioBalanceChanged",
  name: "Input Audio Balance Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputAudioBalance",
      name: "Video Audio Balance",
      type: t.int(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("inputAudioBalance", data.inputAudioBalance);
    ctx.exec("exec");
  },
});

obs.on("InputAudioBalanceChanged", (data) => {
  pkg.emitEvent({ name: "InputAudioBalanceChanged", data });
});

pkg.createEventSchema({
  event: "InputAudioSyncOffsetChanged",
  name: "Input Audio Sync Offset Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputAudioSyncOffset",
      name: "input Audio Sync Offseet",
      type: t.int(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("inputAudioSyncOffset", data.inputAudioSyncOffset);
    ctx.exec("exec");
  },
});

obs.on("InputAudioSyncOffsetChanged", (data) => {
  pkg.emitEvent({ name: "InputAudioSyncOffsetChanged", data });
});

//InputAudioTracksChanged has object

pkg.createEventSchema({
  event: "InputAudioMonitorTypeChanged",
  name: "Input Audio Monitor Type Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "monitorType",
      name: "Monitor Type",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("monitorType", data.monitorType);
    ctx.exec("exec");
  },
});

obs.on("InputAudioMonitorTypeChanged", (data) => {
  pkg.emitEvent({ name: "InputAudioMonitorTypeChanged", data });
});

//inputVolumeMeters has array of objects

pkg.createEventSchema({
  event: "CurrentSceneTransitionChanged",
  name: "Current Scene Transition Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "transitionName",
      name: "Transition Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("transitionName", data.transitionName);
    ctx.exec("exec");
  },
});

obs.on("CurrentSceneTransitionChanged", (data) => {
  pkg.emitEvent({ name: "CurrentSceneTransitionChanged", data });
});

pkg.createEventSchema({
  event: "CurrentSceneTransitionDurationChanged",
  name: "Current Scene Transition Duration Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "transitionDuration",
      name: "Transition Duration",
      type: t.int(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("transitionDuration", data.transitionDuration);
    ctx.exec("exec");
  },
});

obs.on("CurrentSceneTransitionDurationChanged", (data) => {
  pkg.emitEvent({ name: "CurrentSceneTransitionDurationChanged", data });
});

pkg.createEventSchema({
  event: "SceneTransitionStarted",
  name: "Scene Transition Started",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "transitionName",
      name: "Transition Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("transitionName", data.transitionName);
    ctx.exec("exec");
  },
});

obs.on("SceneTransitionStarted", (data) => {
  pkg.emitEvent({ name: "SceneTransitionStarted", data });
});

pkg.createEventSchema({
  event: "SceneTransitionEnded",
  name: "Scene Transition Ended",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "transitionName",
      name: "Transition Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("transitionName", data.transitionName);
    ctx.exec("exec");
  },
});

obs.on("SceneTransitionEnded", (data) => {
  pkg.emitEvent({ name: "SceneTransitionEnded", data });
});

pkg.createEventSchema({
  event: "SceneTransitionVideoEnded",
  name: "Scene Transition Video Ended",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "transitionName",
      name: "Transition Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("transitionName", data.transitionName);
    ctx.exec("exec");
  },
});

obs.on("SceneTransitionVideoEnded", (data) => {
  pkg.emitEvent({ name: "SceneTransitionVideoEnded", data });
});

//SourceFilterListReindexed has array of objects

//SourceFilterCreated has object

pkg.createEventSchema({
  event: "SourceFilterRemoved",
  name: "Source Filter Removed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sourceName",
      name: "Source name",
      type: t.string(),
    });
    io.dataOutput({
      id: "filterName",
      name: "Filter name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sourceName", data.sourceName);
    ctx.setOutput("filterName", data.filterName);
    ctx.exec("exec");
  },
});

obs.on("SourceFilterRemoved", (data) => {
  pkg.emitEvent({ name: "SourceFilterRemoved", data });
});

pkg.createEventSchema({
  event: "SourceFilterNameChanged",
  name: "Source Filter Name Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sourceName",
      name: "Source name",
      type: t.string(),
    });
    io.dataOutput({
      id: "oldFilterName",
      name: "Old Filter name",
      type: t.string(),
    });
    io.dataOutput({
      id: "filterName",
      name: "Filter name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sourceName", data.sourceName);
    ctx.setOutput("oldFilterName", data.oldFilterName);
    ctx.setOutput("filterName", data.filterName);
    ctx.exec("exec");
  },
});

obs.on("SourceFilterNameChanged", (data) => {
  pkg.emitEvent({ name: "SourceFilterNameChanged", data });
});

pkg.createEventSchema({
  event: "SourceFilterEnableStateChanged",
  name: "Source Filter Enable State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sourceName",
      name: "Source name",
      type: t.string(),
    });
    io.dataOutput({
      id: "filterName",
      name: "Filter name",
      type: t.string(),
    });
    io.dataOutput({
      id: "filterEnabled",
      name: "Filter Enabled",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sourceName", data.sourceName);
    ctx.setOutput("oldFilterName", data.filterEnabled);
    ctx.setOutput("filterName", data.filterName);
    ctx.exec("exec");
  },
});

obs.on("SourceFilterEnableStateChanged", (data) => {
  pkg.emitEvent({ name: "SourceFilterEnableStateChanged", data });
});

pkg.createEventSchema({
  event: "SceneItemCreated",
  name: "Scene Item Created",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sourceName",
      name: "Source name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataOutput({
      id: "sceneItemIndex",
      name: "Scene Item Index",
      type: t.int(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.setOutput("sourceName", data.sourceName);
    ctx.setOutput("sceneItemId", data.sceneItemId);
    ctx.setOutput("sceneItemIndex", data.sceneItemIndex);
    ctx.exec("exec");
  },
});

obs.on("SceneItemCreated", (data) => {
  pkg.emitEvent({ name: "SceneItemCreated", data });
});

pkg.createEventSchema({
  event: "SceneItemRemoved",
  name: "Scene Item Removed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sourceName",
      name: "Source name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.setOutput("sourceName", data.sourceName);
    ctx.setOutput("sceneItemId", data.sceneItemId);
    ctx.exec("exec");
  },
});

obs.on("SceneItemRemoved", (data) => {
  pkg.emitEvent({ name: "SceneItemRemoved", data });
});

//Has Object array

// pkg.createEventSchema({
//   event: "SceneItemListReindexed",
//   name: "Scene Item List Reindexed",
//   generateIO(io) {
//    io.execOutput({
//       id: "exec",
//       name: "",
//     });
//    io.dataOutput({
//       id: "sceneName",
//       name: "Scene name",
//       type: types.string(),
//     });
//    io.dataOutput({
//       id: "sceneItems",
//       name: "Source Items",
//       type: types.list(types.object()),
//     });
//   },
//   run({ ctx, data }) {
//     ctx.setOutput("sceneName", data.sceneName);
//     ctx.setOutput("sceneItems", data.sceneItems);
//     ctx.exec("exec");
//   },
// });

// obs.on("SceneItemListReindexed", (data) => {
//   pkg.emitEvent({ name: "SceneItemListReindexed", data });
// });

pkg.createEventSchema({
  event: "SceneItemEnableStateChanged",
  name: "Scene Item Enable State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataOutput({
      id: "sceneItemEnabled",
      name: "Scene Item Enabled",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.setOutput("sceneItemId", data.sceneItemId);
    ctx.setOutput("sceneItemEnabled", data.sceneItemEnabled);
    ctx.exec("exec");
  },
});

obs.on("SceneItemEnableStateChanged", (data) => {
  pkg.emitEvent({ name: "SceneItemEnableStateChanged", data });
});

pkg.createEventSchema({
  event: "SceneItemLockStateChanged",
  name: "Scene Item Lock State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataOutput({
      id: "sceneItemLocked",
      name: "Scene Item Locked",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.setOutput("sceneItemId", data.sceneItemId);
    ctx.setOutput("sceneItemLocked", data.sceneItemLocked);
    ctx.exec("exec");
  },
});

obs.on("SceneItemLockStateChanged", (data) => {
  pkg.emitEvent({ name: "SceneItemLockStateChanged", data });
});

pkg.createEventSchema({
  event: "SceneItemSelected",
  name: "Scene Item Selected",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "sceneName",
      name: "Scene name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("sceneName", data.sceneName);
    ctx.setOutput("sceneItemId", data.sceneItemId);
    ctx.exec("exec");
  },
});

obs.on("SceneItemSelected", (data) => {
  pkg.emitEvent({ name: "SceneItemSelected", data });
});

//SceneItemTransformChanged has object

// pkg.createEventSchema({
//   event: "SceneItemTransformChanged",
//   name: "Scene Item Transform Changed",
//   generateIO(io) {
//    io.execOutput({
//       id: "exec",
//       name: "",
//     });
//    io.dataOutput({
//       id: "sceneName",
//       name: "Scene name",
//       type: types.string(),
//     });
//    io.dataOutput({
//       id: "sceneItemId",
//       name: "Scene Item Id",
//       type: types.int(),
//     });
//    io.dataOutput({
//       id: "sceneItemTransform",
//       name: "Scene Item Transform",
//       type: types.object(),
//     });
//   },
//   run({ ctx, data }) {
//     ctx.setOutput("sceneName", data.sceneName);
//     ctx.setOutput("sceneItemId", data.sceneItemId);
//     ctx.setOutput("sceneItemTransform", data.sceneItemTransform);
//     ctx.exec("exec");
//   },
// });

// obs.on("SceneItemTransformChanged", (data) => {
//   pkg.emitEvent({ name: "SceneItemTransformChanged", data });
// });

pkg.createEventSchema({
  event: "StreamStateChanged",
  name: "Stream State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "outputActive",
      name: "Output Active",
      type: t.bool(),
    });
    io.dataOutput({
      id: "outputState",
      name: "Output State",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("outputActive", data.outputActive);
    ctx.setOutput("outputState", data.outputState);
    ctx.exec("exec");
  },
});

obs.on("StreamStateChanged", (data) => {
  pkg.emitEvent({ name: "StreamStateChanged", data });
});

pkg.createEventSchema({
  event: "RecordStateChanged",
  name: "Record State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "outputActive",
      name: "Output Active",
      type: t.bool(),
    });
    io.dataOutput({
      id: "outputState",
      name: "Output State",
      type: t.string(),
    });
    io.dataOutput({
      id: "outputPath",
      name: "Output Path",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("outputActive", data.outputActive);
    ctx.setOutput("outputState", data.outputState);
    ctx.setOutput("outputPath", (data as any).outputPath);
    ctx.exec("exec");
  },
});

obs.on("RecordStateChanged", (data) => {
  pkg.emitEvent({ name: "RecordStateChanged", data });
});

pkg.createEventSchema({
  event: "ReplayBufferStateChanged",
  name: "Replay Buffer State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "outputActive",
      name: "Output Active",
      type: t.bool(),
    });
    io.dataOutput({
      id: "outputState",
      name: "Output State",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("outputActive", data.outputActive);
    ctx.setOutput("outputState", data.outputState);
    ctx.exec("exec");
  },
});

obs.on("ReplayBufferStateChanged", (data) => {
  pkg.emitEvent({ name: "ReplayBufferStateChanged", data });
});

pkg.createEventSchema({
  event: "VirtualcamStateChanged",
  name: "Virtual Cam State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "outputActive",
      name: "Output Active",
      type: t.bool(),
    });
    io.dataOutput({
      id: "outputState",
      name: "Output State",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("outputActive", data.outputActive);
    ctx.setOutput("outputState", data.outputState);
    ctx.exec("exec");
  },
});

obs.on("VirtualcamStateChanged", (data) => {
  pkg.emitEvent({ name: "VirtualcamStateChanged", data });
});

pkg.createEventSchema({
  event: "ReplayBufferSaved",
  name: "Replay Buffer Saved",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "savedReplayPath",
      name: "Saved Replay Path",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("savedReplayPath", data.savedReplayPath);
    ctx.exec("exec");
  },
});

obs.on("ReplayBufferSaved", (data) => {
  pkg.emitEvent({ name: "ReplayBufferSaved", data });
});

pkg.createEventSchema({
  event: "MediaInputPlaybackStarted",
  name: "Media Input Playback Started",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.exec("exec");
  },
});

obs.on("MediaInputPlaybackStarted", (data) => {
  pkg.emitEvent({ name: "MediaInputPlaybackStarted", data });
});

pkg.createEventSchema({
  event: "MediaInputPlaybackEnded",
  name: "Media Input Playback Ended",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.exec("exec");
  },
});

obs.on("MediaInputPlaybackEnded", (data) => {
  pkg.emitEvent({ name: "MediaInputPlaybackEnded", data });
});

pkg.createEventSchema({
  event: "MediaInputActionTriggered",
  name: "Media Input Action Triggered",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "mediaAction",
      name: "Media Action",
      type: t.string(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("inputName", data.inputName);
    ctx.setOutput("mediaAction", data.mediaAction);
    ctx.exec("exec");
  },
});

obs.on("MediaInputActionTriggered", (data) => {
  pkg.emitEvent({ name: "MediaInputActionTriggered", data });
});

pkg.createEventSchema({
  event: "StudioModeStateChanged",
  name: "Studio Mode State Changed",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
    io.dataOutput({
      id: "studioModeEnabled",
      name: "Studio Mode Enabled",
      type: t.bool(),
    });
  },
  run({ ctx, data }) {
    ctx.setOutput("studioModeEnabled", data.studioModeEnabled);
    ctx.exec("exec");
  },
});

obs.on("StudioModeStateChanged", (data) => {
  pkg.emitEvent({ name: "StudioModeStateChanged", data });
});

//Doesnt Exist Yet

// pkg.createEventSchema({
//   event: "ScreenshotSaved",
//   name: "Screenshot Saved",
//   generateIO(io) {
//    io.execOutput({
//       id: "exec",
//       name: "",
//     });
//    io.dataOutput({
//       id: "savedScreenshotPath",
//       name: "Saved Screenshot Path",
//       type: types.bool(),
//     });
//   },
//   run({ ctx, data }) {
//     ctx.setOutput("savedScreenshotPath", data.savedScreenshotPath);
//     ctx.exec("exec");
//   },
// });

// obs.on("ScreenshotSaved", (data) => {
//   pkg.emitEvent({ name: "ScreenshotSaved", data });
// });

pkg.createEventSchema({
  event: "ConnectionOpened",
  name: "Connection Opened",
  generateIO(io) {
    io.execOutput({
      id: "exec",
      name: "",
    });
  },
  run({ ctx }) {
    ctx.exec("exec");
  },
});

obs.on("ConnectionOpened", () =>
  pkg.emitEvent({ name: "ConnectionOpened", data: undefined })
);
