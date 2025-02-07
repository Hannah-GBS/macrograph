import { t } from "@macrograph/core";
import pkg from "./pkg";
import { obs } from "./ws";

//missing availableRequests & supportedImageForamts Array<string>

const versionOutputs = [
  {
    id: "obsVersion",
    name: "OBS Version",
    type: t.string(),
  },
  {
    id: "obsWebSocketVersion",
    name: "OBS WS Version",
    type: t.string(),
  },
  {
    id: "rpcVersion",
    name: "RPC Version",
    type: t.int(),
  },
  {
    id: "platform",
    name: "Platform",
    type: t.string(),
  },
  {
    id: "supportedImageFormats",
    name: "Supported Image Formats",
    type: t.list(t.string()),
  },
  {
    id: "availableRequests",
    name: "Available Requests",
    type: t.list(t.string()),
  },
  {
    id: "platformDescription",
    name: "Platform Description",
    type: t.string(),
  },
] as const;

pkg.createNonEventSchema({
  name: "Get OBS Version",
  variant: "Exec",
  generateIO(io) {
    versionOutputs.forEach((data) => io.dataOutput(data));
  },
  async run({ ctx }) {
    const data = await obs.call("GetVersion");
    versionOutputs.forEach(({ id }) => ctx.setOutput(id, data[id]));
  },
});

const statsOutputs = [
  ["cpuUsage", "CPU Usage"],
  ["memoryUsage", "Memory Usage"],
  ["availableDiskSpace", "Available Disk Space"],
  ["activeFps", "Active FPS"],
  ["averageFrameRenderTime", "Avg Frame Render Time"],
  ["renderSkippedFrames", "Render Skipped Frames"],
  ["renderTotalFrames", "Render Total Frames"],
  ["outputSkippedFrames", "Output Skipped Frames"],
  ["outputTotalFrames", "Output Total Frames"],
  ["webSocketSessionIncomingMessages", "Incoming Messages"],
  ["webSocketSessionOutgoingMessages", "Outgoing Messaes"],
] as const;

pkg.createNonEventSchema({
  name: "Get OBS Stats",
  variant: "Exec",
  generateIO(io) {
    statsOutputs.map(([id, name]) =>
      io.dataOutput({ id, name, type: t.int() })
    );
  },
  async run({ ctx }) {
    const data = await obs.call("GetStats");
    statsOutputs.forEach(([id]) => ctx.setOutput(id, data[id]));
  },
});

// Missing BroadcastCustomEvent requires OBject request

// Missing CallVendorRequest requires Object request and response

pkg.createNonEventSchema({
  name: "Get Hotkey list",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "hotkeys",
      name: "Hotkeys",
      type: t.list(t.string()),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetHotkeyList");
    ctx.setOutput("hotkeys", data.hotkeys);
  },
});

pkg.createNonEventSchema({
  name: "Trigger Hotkey By Name",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "hotkeyName",
      name: "Hotkey Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("TriggerHotkeyByName", { hotkeyName: ctx.getInput("hotkeyName") });
  },
});

// Missing TriggerHotkeyByKeySequence requires object in requests

// Missing Sleep as it is batch specific

// Missing GetPersistentData as it has any type in response

// Missing SetPersistentData as it has any type in request

pkg.createNonEventSchema({
  name: "Get Scene Collection List",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "currentSceneCollectionName",
      name: "Scene Collection Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sceneCollections",
      name: "Scene Collections",
      type: t.list(t.string()),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetSceneCollectionList");
    ctx.setOutput(
      "currentSceneCollectionName",
      data.currentSceneCollectionName
    );
    ctx.setOutput("sceneCollections", data.sceneCollections);
  },
});

pkg.createNonEventSchema({
  name: "Set Current Scene Collection",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneCollectionName",
      name: "Scene Collection Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("SetCurrentSceneCollection", {
      sceneCollectionName: ctx.getInput("sceneCollectionName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Create Scene Collection",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "SceneCollectionName",
      name: "Scene Collection Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("CreateSceneCollection", {
      sceneCollectionName: ctx.getInput("sceneCollectionName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Profile list",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "currentProfileName",
      name: "Profile Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "profiles",
      name: "Profiles",
      type: t.list(t.string()),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetProfileList");
    ctx.setOutput("currentProfileName", data.currentProfileName);
    ctx.setOutput("profiles", data.profiles);
  },
});
pkg.createNonEventSchema({
  name: "Set Current Profile",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "profileName",
      name: "Profile Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("SetCurrentProfile", { profileName: ctx.getInput("profileName") });
  },
});

pkg.createNonEventSchema({
  name: "Create Profile",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "profileName",
      name: "Profile Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("CreateProfile", { profileName: ctx.getInput("profileName") });
  },
});

pkg.createNonEventSchema({
  name: "Remove Profile",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "profileName",
      name: "Profile Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("RemoveProfile", { profileName: ctx.getInput("profileName") });
  },
});

pkg.createNonEventSchema({
  name: "Get Profile Parameter",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "parameterCategory",
      name: "Catagory",
      type: t.string(),
    });
    io.dataInput({
      id: "parameterName",
      name: "Name",
      type: t.string(),
    });

    io.dataOutput({
      id: "parameterValue",
      name: "Value",
      type: t.string(),
    });
    io.dataOutput({
      id: "defaultParameterValue",
      name: "Default Value",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetProfileParameter", {
      parameterCategory: ctx.getInput("parameterCategory"),
      parameterName: ctx.getInput("parameterName"),
    });
    ctx.setOutput("parameterValue", data.parameterValue);
    ctx.setOutput("defaultParameterValue", data.defaultParameterValue);
  },
});

pkg.createNonEventSchema({
  name: "Set Profile Parameter",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "parameterCategory",
      name: "Catagory",
      type: t.string(),
    });
    io.dataInput({
      id: "parameterName",
      name: "Name",
      type: t.string(),
    });
    io.dataInput({
      id: "parameterValue",
      name: "Value",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("SetProfileParameter", {
      parameterCategory: ctx.getInput("parameterCategory"),
      parameterName: ctx.getInput("parameterName"),
      parameterValue: ctx.getInput("parameterValue"),
    });
  },
});

const videoSettingOutputs = [
  ["fpsNumerator", "FPS Numerator"],
  ["fpsDenominator", "FPS Denominator"],
  ["baseWidth", "Base Width"],
  ["baseHeight", "Base Height"],
  ["outputWidth", "Output Width"],
  ["outputHeight", "Output Height"],
] as const;

pkg.createNonEventSchema({
  name: "Get Video Settings",
  variant: "Exec",
  generateIO(io) {
    videoSettingOutputs.forEach(([id, name]) =>
      io.dataOutput({ id, name, type: t.int() })
    );
  },
  async run({ ctx }) {
    const data = await obs.call("GetVideoSettings");
    videoSettingOutputs.forEach(([id]) => ctx.setOutput(id, data[id]));
  },
});

pkg.createNonEventSchema({
  name: "Set Video Settings",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "fpsNumerator",
      name: "FPS Numberator",
      type: t.int(),
    }),
      io.dataInput({
        id: "fpsDenominator",
        name: "FPS Denominator",
        type: t.int(),
      }),
      io.dataInput({
        id: "baseWidth",
        name: "Base Width",
        type: t.int(),
      }),
      io.dataInput({
        id: "baseHeight",
        name: "Base Height",
        type: t.int(),
      }),
      io.dataInput({
        id: "outputWidth",
        name: "Output Width",
        type: t.int(),
      }),
      io.dataInput({
        id: "outputHeight",
        name: "Output Height",
        type: t.int(),
      });
  },
  run({ ctx }) {
    obs.call("SetVideoSettings", {
      fpsNumerator: ctx.getInput("fpsNumerator"),
      fpsDenominator: ctx.getInput("fpsDenominator"),
      baseWidth: ctx.getInput("baseWidth"),
      baseHeight: ctx.getInput("baseHeight"),
      outputWidth: ctx.getInput("outputWidth"),
      outputHeight: ctx.getInput("outputHeight"),
    });
  },
});

//Missing GetStreamServiceSettings as it contains Object

//Missing SetStreamingServiceSettings as it contains object

pkg.createNonEventSchema({
  name: "Get Record Directory",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "recordDirectory",
      name: "Record Directory",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetRecordDirectory");
    ctx.setOutput("recordDirectory", data.recordDirectory);
  },
});

pkg.createNonEventSchema({
  name: "Get Source Active",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sourceName",
      name: "Source Name",
      type: t.string(),
    }),
      io.dataOutput({
        id: "videoActive",
        name: "Video Active",
        type: t.bool(),
      }),
      io.dataOutput({
        id: "videoShowing",
        name: "Video Showing",
        type: t.bool(),
      });
  },
  async run({ ctx }) {
    const data = await obs.call("GetSourceActive", {
      sourceName: ctx.getInput("sourceName"),
    });
    ctx.setOutput("videoActive", data.videoActive);
    ctx.setOutput("videoShowing", data.videoShowing);
  },
});

//Missing GetSourceScreenshot as it has Base64-Encoded Screenshot data

//Missing SaveSourceScreenshot as it has Base64-Encoded Screenshot data

//Missing GetSceneList as it contains array of object

pkg.createNonEventSchema({
  name: "Get Group List",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "groups",
      name: "Groups",
      type: t.list(t.string()),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetGroupList");
    ctx.setOutput("groups", data.groups);
  },
});

pkg.createNonEventSchema({
  name: "Get Current Program Scene",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "currentProgramSceneName",
      name: "Current Program Scene Name",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetCurrentProgramScene");
    ctx.setOutput("currentProgramSceneName", data.currentProgramSceneName);
  },
});

pkg.createNonEventSchema({
  name: "Set Current Program Scene",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("SetCurrentProgramScene", {
      sceneName: ctx.getInput("sceneName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Current Preview Scene",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "currentPreviewSceneName",
      name: "Current Program Scene Name",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetCurrentPreviewScene");
    ctx.setOutput("currentPreviewSceneName", data.currentPreviewSceneName);
  },
});

pkg.createNonEventSchema({
  name: "Set Current Preview Scene",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("SetCurrentPreviewScene", {
      sceneName: ctx.getInput("sceneName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Create Scene",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("CreateScene", { sceneName: ctx.getInput("sceneName") });
  },
});

pkg.createNonEventSchema({
  name: "Remove Scene",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("RemoveScene", { sceneName: ctx.getInput("sceneName") });
  },
});

pkg.createNonEventSchema({
  name: "Set Scene Name",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "newSceneName",
      name: "New Scene Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("SetSceneName", {
      sceneName: ctx.getInput("sceneName"),
      newSceneName: ctx.getInput("newSceneName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Scene Transition Override",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "transitionName",
      name: "Transition Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "transitionDuration",
      name: "Transition Duration",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetSceneSceneTransitionOverride", {
      sceneName: ctx.getInput("sceneName"),
    });
    ctx.setOutput("transitionName", data.transitionName);
    ctx.setOutput("transitionDuration", data.transitionDuration);
  },
});

pkg.createNonEventSchema({
  name: "Set Scene Transition Override",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "transitionName",
      name: "Transition Name",
      type: t.string(),
    });
    io.dataInput({
      id: "transitionDuration",
      name: "Transition Duration",
      type: t.int(),
    });
  },
  run({ ctx }) {
    obs.call("SetSceneSceneTransitionOverride", {
      sceneName: ctx.getInput("sceneName"),
      transitionName: ctx.getInput("transitionName"),
      transitionDuration: ctx.getInput("transitionDuration"),
    });
  },
});

//GetInputList has array of objects

pkg.createNonEventSchema({
  name: "Get Input Kind List",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "unversioned",
      name: "Unversioned",
      type: t.bool(),
    });
    io.dataOutput({
      id: "inputKinds",
      name: "Input Kinds",
      type: t.list(t.string()),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetInputKindList", {
      unversioned: ctx.getInput("unversioned"),
    });
    ctx.setOutput("inputKinds", data.inputKinds);
  },
});

const SpecialInputsOutputs = [
  ["desktop1", "Desktop 1"],
  ["desktop2", "Desktop 2"],
  ["mic1", "Mic1"],
  ["mic2", "Mic2"],
  ["mic3", "Mic3"],
  ["mic4", "Mic4"],
] as const;

pkg.createNonEventSchema({
  name: "Get Special Inputs",
  variant: "Exec",
  generateIO(io) {
    SpecialInputsOutputs.map(([id, name]) =>
      io.dataOutput({ id, name, type: t.string() })
    );
  },
  async run({ ctx }) {
    const data = await obs.call("GetSpecialInputs");
    SpecialInputsOutputs.forEach(([id]) => ctx.setOutput(id, data[id]));
  },
});

//Create Input doesnt allow custom init settings as its an objecy

pkg.createNonEventSchema({
  name: "Create Input",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "inputKind",
      name: "Input kind",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemEnabled",
      name: "Scene Item Enabled",
      type: t.bool(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("CreateInput", {
      inputKind: ctx.getInput<string>("inputKind"),
      sceneName: ctx.getInput("sceneName"),
      inputName: ctx.getInput("inputName"),
      sceneItemEnabled: ctx.getInput("sceneItemEnabled"),
    });
    ctx.setOutput("sceneItemId", data.sceneItemId);
  },
});

pkg.createNonEventSchema({
  name: "Remove Input",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("RemoveInput", {
      inputName: ctx.getInput("inputName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Set Input Name",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "newInputName",
      name: "New Input Name",
      type: t.string(),
    });
  },
  run({ ctx }) {
    obs.call("SetInputName", {
      inputName: ctx.getInput("inputName"),
      newInputName: ctx.getInput("newInputName"),
    });
  },
});

//GetInputDefaultSettings has object

//GetINputSettings has object

//SetInputSettings has object

pkg.createNonEventSchema({
  name: "Get Input Mute",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputMuted",
      name: "Input Muted",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetInputMute", {
      inputName: ctx.getInput("inputName"),
    });
    ctx.setOutput("inputMuted", data.inputMuted);
  },
});

pkg.createNonEventSchema({
  name: "Set Input Mute",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "inputMuted",
      name: "Input Muted",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    obs.call("SetInputMute", {
      inputName: ctx.getInput("inputName"),
      inputMuted: ctx.getInput("inputMuted"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Toggle Input Mute",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputMuted",
      name: "Input Muted",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("ToggleInputMute", {
      inputName: ctx.getInput("inputName"),
    });
    ctx.setOutput("inputMuted", data.inputMuted);
  },
});

pkg.createNonEventSchema({
  name: "Get Input Volume",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputVolumeMul",
      name: "Input Volume Mul",
      type: t.int(),
    });
    io.dataOutput({
      id: "inputVolumeDb",
      name: "Input Volume Db",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetInputVolume", {
      inputName: ctx.getInput("inputName"),
    });
    ctx.setOutput("inputVolumeMul", data.inputVolumeMul);
    ctx.setOutput("inputVolumeDb", data.inputVolumeDb);
  },
});

pkg.createNonEventSchema({
  name: "Set Input Volume",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "inputVolumeMul",
      name: "Input Volume Mul",
      type: t.bool(),
    });
    io.dataInput({
      id: "inputVolumeDb",
      name: "Input Volume Db",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    obs.call("SetInputVolume", {
      inputName: ctx.getInput("inputName"),
      inputVolumeMul: ctx.getInput("inputVolumeMul"),
      inputVolumeDb: ctx.getInput("inputVolumeDb"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Input Audio Balance",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputAudioBalance",
      name: "Input Audio Balance",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetInputAudioBalance", {
      inputName: ctx.getInput("inputName"),
    });
    ctx.setOutput("inputAudioBalance", data.inputAudioBalance);
  },
});

pkg.createNonEventSchema({
  name: "Set Input Audio Balance",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "inputAudioBalance",
      name: "Input Audio Balance",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("SetInputAudioBalance", {
      inputName: ctx.getInput("inputName"),
      inputAudioBalance: ctx.getInput("inputAudioBalance"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Input Audio Sync Offset",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "inputAudioSyncOffset",
      name: "Input Audio Sync Offset",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetInputAudioSyncOffset", {
      inputName: ctx.getInput("inputName"),
    });
    ctx.setOutput("inputAudioSyncOffset", data.inputAudioSyncOffset);
  },
});

pkg.createNonEventSchema({
  name: "Set Input Audio Sync Offset",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "inputAudioSyncOffset",
      name: "Input Audio Sync Offset",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("SetInputAudioSyncOffset", {
      inputName: ctx.getInput("inputName"),
      inputAudioSyncOffset: ctx.getInput("inputAudioSyncOffset"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Input Audio Monitor Type",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
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
  async run({ ctx }) {
    const data = await obs.call("GetInputAudioMonitorType", {
      inputName: ctx.getInput("inputName"),
    });
    ctx.setOutput("monitorType", data.monitorType);
  },
});

pkg.createNonEventSchema({
  name: "Set Input Audio Monitor Type",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "monitorType",
      name: "Monitor Type",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("SetInputAudioMonitorType", {
      inputName: ctx.getInput("inputName"),
      monitorType: ctx.getInput("monitorType"),
    });
  },
});

//GetInputAudioTracks contains object

//SetInputAudioTracks contains object

//GetInputPropertiesListPropertyItems contains array of objects

pkg.createNonEventSchema({
  name: "Press Input Properties Button",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "propertyName",
      name: "Property Name",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("PressInputPropertiesButton", {
      inputName: ctx.getInput("inputName"),
      propertyName: ctx.getInput("propertyName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Transition Kind List",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "transitionKinds",
      name: "Transition Kinds",
      type: t.list(t.string()),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetTransitionKindList");
    ctx.setOutput("transitionKinds", data.transitionKinds);
  },
});

//GetSceneTransitionList contains array of objects

//GetCurrentSceneTransition contains object

pkg.createNonEventSchema({
  name: "Set Current Scene Transition",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "transitionName",
      name: "Transition Name",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("SetCurrentSceneTransition", {
      transitionName: ctx.getInput<string>("transitionName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Set Current Scene Transition Duration",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "transitionDuration",
      name: "Transition Duration",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("SetCurrentSceneTransitionDuration", {
      transitionDuration: ctx.getInput<number>("transitionDuration"),
    });
  },
});

//SetCurrentSceneTransitionSettings contains object

pkg.createNonEventSchema({
  name: "Get Current Scene Transition Cursor",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "transitionCursor",
      name: "Transition Cursor",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetCurrentSceneTransitionCursor");
    ctx.setOutput("transitionCursor", data.transitionCursor);
  },
});

pkg.createNonEventSchema({
  name: "Trigger Studio Mode Transition",
  variant: "Exec",
  generateIO() {},
  async run() {
    await obs.call("TriggerStudioModeTransition");
  },
});

pkg.createNonEventSchema({
  name: "Set T Bar Position",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "position",
      name: "Position",
      type: t.int(),
    });
    io.dataInput({
      id: "release",
      name: "Release",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    obs.call("SetTBarPosition", {
      position: ctx.getInput("position"),
      release: ctx.getInput("release"),
    });
  },
});

//GetSourceFilterList contains array of object

//GetSourceFilterDefaultSettings contains object

//CreateSourceFilter contains object

pkg.createNonEventSchema({
  name: "Remove Source Filter",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sourceName",
      name: "Source Name",
      type: t.string(),
    });
    io.dataInput({
      id: "filterName",
      name: "Filter Name",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("RemoveSourceFilter", {
      sourceName: ctx.getInput("sourceName"),
      filterName: ctx.getInput("filterName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Set Source Filter Name",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sourceName",
      name: "Source Name",
      type: t.string(),
    });
    io.dataInput({
      id: "filterName",
      name: "Filter Name",
      type: t.string(),
    });
    io.dataInput({
      id: "newFilterName",
      name: "New Filter Name",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("SetSourceFilterName", {
      sourceName: ctx.getInput("sourceName"),
      filterName: ctx.getInput("filterName"),
      newFilterName: ctx.getInput("newFilterName"),
    });
  },
});

//GetSourceFilter contains object

pkg.createNonEventSchema({
  name: "Set Source Filter Name",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sourceName",
      name: "Source Name",
      type: t.string(),
    });
    io.dataInput({
      id: "filterName",
      name: "Filter Name",
      type: t.string(),
    });
    io.dataInput({
      id: "filterIndex",
      name: "Filter Index",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("SetSourceFilterIndex", {
      sourceName: ctx.getInput("sourceName"),
      filterName: ctx.getInput("filterName"),
      filterIndex: ctx.getInput("filterIndex"),
    });
  },
});

//SetSourceFilterSettings contains object

pkg.createNonEventSchema({
  name: "Set Source Filter Enabled",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sourceName",
      name: "Source Name",
      type: t.string(),
    });
    io.dataInput({
      id: "filterName",
      name: "Filter Name",
      type: t.string(),
    });
    io.dataInput({
      id: "filterEnabled",
      name: "Filter Enabled",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("SetSourceFilterEnabled", {
      sourceName: ctx.getInput("sourceName"),
      filterName: ctx.getInput("filterName"),
      filterEnabled: ctx.getInput("filterEnabled"),
    });
  },
});

//GetSceneItemList contains array of object

//GetGroupSceneItemList contains array of object

pkg.createNonEventSchema({
  name: "Get Scene Item Id",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sourceName",
      name: "Source Name",
      type: t.string(),
    });
    io.dataInput({
      id: "searchOffset",
      name: "Search Offset",
      type: t.int(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetSceneItemId", {
      sceneName: ctx.getInput("sceneName"),
      sourceName: ctx.getInput("sourceName"),
      searchOffset: ctx.getInput("searchOffset"),
    });
    ctx.setOutput("sceneItemId", data.sceneItemId);
  },
});

pkg.createNonEventSchema({
  name: "Create Scene Item",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sourceName",
      name: "Source Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemEnabled",
      name: "Search Offset",
      type: t.bool(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("CreateSceneItem", {
      sceneName: ctx.getInput("sceneName"),
      sourceName: ctx.getInput("sourceName"),
      sceneItemEnabled: ctx.getInput("sceneItemEnabled"),
    });
    ctx.setOutput("sceneItemId", data.sceneItemId);
  },
});

pkg.createNonEventSchema({
  name: "Remove Scene Item",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("RemoveSceneItem", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Duplicate Scene Item",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataInput({
      id: "destinationSceneName",
      name: "Destination Scene Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("DuplicateSceneItem", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
      destinationSceneName: ctx.getInput("destinationSceneName"),
    });
    ctx.setOutput("sceneItemId", data.sceneItemId);
  },
});

//GetSceneItemTransform contains object

//SetSceneItemTransform contains object

pkg.createNonEventSchema({
  name: "Get Scene Item Enabled",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
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
  async run({ ctx }) {
    const data = await obs.call("GetSceneItemEnabled", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
    });
    ctx.setOutput("sceneItemEnabled", data.sceneItemEnabled);
  },
});

pkg.createNonEventSchema({
  name: "Set Scene Item Enabled",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataInput({
      id: "sceneItemEnabled",
      name: "Scene Item Enabled",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    await obs.call("SetSceneItemEnabled", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
      sceneItemEnabled: ctx.getInput<boolean>("sceneItemEnabled"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Scene Item Locked",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
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
  async run({ ctx }) {
    const data = await obs.call("GetSceneItemLocked", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
    });
    ctx.setOutput("sceneItemLocked", data.sceneItemLocked);
  },
});

pkg.createNonEventSchema({
  name: "Set Scene Item Locked",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataInput({
      id: "sceneItemLocked",
      name: "Scene Item Locked",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    obs.call("SetSceneItemLocked", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
      sceneItemLocked: ctx.getInput("sceneItemLocked"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Scene Item Index",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
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
  async run({ ctx }) {
    const data = await obs.call("GetSceneItemIndex", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
    });
    ctx.setOutput("sceneItemIndex", data.sceneItemIndex);
  },
});

pkg.createNonEventSchema({
  name: "Set Scene Item Index",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataInput({
      id: "sceneItemIndex",
      name: "Scene Item Index",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("SetSceneItemIndex", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
      sceneItemIndex: ctx.getInput("sceneItemIndex"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Scene Item Blend Mode",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataOutput({
      id: "sceneItemBlendMode",
      name: "Scene Item Blend Mode",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetSceneItemBlendMode", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
    });
    ctx.setOutput("sceneItemBlendMode", data.sceneItemBlendMode);
  },
});

pkg.createNonEventSchema({
  name: "Set Scene Item Blend Mode",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "sceneName",
      name: "Scene Name",
      type: t.string(),
    });
    io.dataInput({
      id: "sceneItemId",
      name: "Scene Item Id",
      type: t.int(),
    });
    io.dataInput({
      id: "sceneItemEnabled",
      name: "Scene Item Enabled",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("SetSceneItemBlendMode", {
      sceneName: ctx.getInput("sceneName"),
      sceneItemId: ctx.getInput("sceneItemId"),
      sceneItemBlendMode: ctx.getInput("sceneItemBlendMode"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Virtual Cam Status",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "outputActive",
      name: "Ouput Active",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetVirtualCamStatus");
    ctx.setOutput("outputActive", data.outputActive);
  },
});

pkg.createNonEventSchema({
  name: "Toggle Virtual Cam",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "outputActive",
      name: "Ouput Active",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("ToggleVirtualCam");
    ctx.setOutput("outputActive", data.outputActive);
  },
});

pkg.createNonEventSchema({
  name: "Start Virtual Cam",
  variant: "Exec",
  generateIO() {},
  async run() {
    obs.call("StartVirtualCam");
  },
});

pkg.createNonEventSchema({
  name: "Stop Virtual Cam",
  variant: "Exec",
  generateIO() {},
  async run() {
    obs.call("StopVirtualCam");
  },
});

pkg.createNonEventSchema({
  name: "Get Replay Buffer Status",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "outputActive",
      name: "Ouput Active",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetReplayBufferStatus");
    ctx.setOutput("outputActive", data.outputActive);
  },
});

pkg.createNonEventSchema({
  name: "Toggle Replay Buffer",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "outputActive",
      name: "Ouput Active",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("ToggleReplayBuffer");
    ctx.setOutput("outputActive", data.outputActive);
  },
});

pkg.createNonEventSchema({
  name: "Start Replay Buffer",
  variant: "Exec",
  generateIO() {},
  async run() {
    obs.call("StartReplayBuffer");
  },
});

pkg.createNonEventSchema({
  name: "Stop Replay Buffer",
  variant: "Exec",
  generateIO() {},
  async run() {
    obs.call("StopReplayBuffer");
  },
});

pkg.createNonEventSchema({
  name: "Save Replay Buffer",
  variant: "Exec",
  generateIO() {},
  async run() {
    obs.call("SaveReplayBuffer");
  },
});

pkg.createNonEventSchema({
  name: "Get Last Replay Buffer Replay",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "savedReplayPath",
      name: "Save Replay Path",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetLastReplayBufferReplay");
    ctx.setOutput("savedReplayPath", data.savedReplayPath);
  },
});

//GetOUtputList has array of objects

// const OutputStatus = [
//   {
//     id: "outputActive",
//     name: "Output Active",
//     type: types.bool(),
//   },
//   {
//     id: "outputReconnecting",
//     name: "Output Reconnecting",
//     type: types.bool(),
//   },
//   {
//     id: "outputTimecode",
//     name: "Output Timecode",
//     type: types.string(),
//   },
//   {
//     id: "outputDuration",
//     name: "Output Duration",
//     type: types.int(),
//   },
//   {
//     id: "outputCongestion",
//     name: "Output Congestion",
//     type: types.int(),
//   },
//   {
//     id: "outputBytes",
//     name: "Output Bytes",
//     type: types.int(),
//   },
//   {
//     id: "outputSkippedFrames",
//     name: "Output Skipped Frames",
//     type: types.int(),
//   },
//   {
//     id: "outputTotalFrames",
//     name: "Output Total Frames",
//     type: types.int(),
//   },
// ] as const;

// pkg.createNonEventSchema({
//   name: "Toggle Output",
//   variant: "Exec",
//   generateIO(io) {
//    io.dataInput({
//       id: "outputName",
//       name: "Output Name",
//       type: types.string(),
//     });
//     OutputStatus.forEach((data) =>io.dataOutput(data));
//   },
//   async run({ ctx }) {
//     const data = await obs.call("GetOutputStatus", {
//       outputName: ctx.getInput("outputName")
//     });
//     OutputStatus.forEach(({ id }) => ctx.setOutput(id, data[id]));
//   },
// });

// pkg.createNonEventSchema({
//   name: "Start Output",
//   variant: "Exec",
//   generateIO(io) {
//    io.dataInput({
//       id: "outputName",
//       name: "Output Name",
//       type: types.string(),
//     });
//   },
//   async run({ ctx }) {
//     obs.call("StartOutput", {
//       outputName: ctx.getInput("outputName"),
//     });
//   },
// });

// pkg.createNonEventSchema({
//   name: "Stop Output",
//   variant: "Exec",
//   generateIO(io) {
//    io.dataInput({
//       id: "outputName",
//       name: "Output Name",
//       type: types.string(),
//     });
//   },
//   async run({ ctx }) {
//     obs.call("StopOutput", {
//       outputName: ctx.getInput("outputName"),
//     });
//   },
// });

//GetOutputSettings has object

//SetOutputSettings has object

const StreamStatus = [
  {
    id: "outputActive",
    name: "Output Active",
    type: t.bool(),
  },
  {
    id: "outputReconnecting",
    name: "Output Reconnecting",
    type: t.bool(),
  },
  {
    id: "outputTimecode",
    name: "Output Timecode",
    type: t.string(),
  },
  {
    id: "outputDuration",
    name: "Output Duration",
    type: t.int(),
  },
  // {
  //   id: "outputCongestion",
  //   name: "Output Congestion",
  //   type: types.int(),
  // },
  {
    id: "outputBytes",
    name: "Output Bytes",
    type: t.int(),
  },
  {
    id: "outputSkippedFrames",
    name: "Output Skipped Frames",
    type: t.int(),
  },
  {
    id: "outputTotalFrames",
    name: "Output Total Frames",
    type: t.int(),
  },
] as const;

pkg.createNonEventSchema({
  name: "Toggle Output",
  variant: "Exec",
  generateIO(io) {
    StreamStatus.forEach((data) => io.dataOutput(data));
  },
  async run({ ctx }) {
    const data = await obs.call("GetStreamStatus");
    StreamStatus.forEach(({ id }) => ctx.setOutput(id, data[id]));
  },
});

pkg.createNonEventSchema({
  name: "Toggle Stream",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "outputActive",
      name: "Ouput Active",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("ToggleStream");
    ctx.setOutput("outputActive", data.outputActive);
  },
});

pkg.createNonEventSchema({
  name: "Start Stream",
  variant: "Exec",
  generateIO() {},
  async run() {
    obs.call("StartStream");
  },
});

pkg.createNonEventSchema({
  name: "Stop Stream",
  variant: "Exec",
  generateIO() {},
  async run() {
    obs.call("StopStream");
  },
});

pkg.createNonEventSchema({
  name: "Send Stream Caption",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "captionText",
      name: "Caption Text",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("SendStreamCaption", {
      captionText: ctx.getInput("captionText"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Record Status",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "outputActive",
      name: "Output Active",
      type: t.list(t.bool()),
    });
    io.dataOutput({
      id: "outputPaused",
      name: "Output Paused",
      type: t.list(t.bool()),
    });
    io.dataOutput({
      id: "outputTimecode",
      name: "Output Timecode",
      type: t.string(),
    });
    io.dataOutput({
      id: "outputDuration",
      name: "Output Duration",
      type: t.int(),
    });
    io.dataOutput({
      id: "outputBytes",
      name: "Output Bytes",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetRecordStatus");
    ctx.setOutput("outputActive", data.outputActive);
    ctx.setOutput("outputPaused", data.ouputPaused);
    ctx.setOutput("outputTimecode", data.outputTimecode);
    ctx.setOutput("outputDuration", data.outputDuration);
    ctx.setOutput("outputBytes", data.outputBytes);
  },
});

pkg.createNonEventSchema({
  name: "Toggle Record",
  variant: "Exec",
  generateIO() {},
  async run() {
    obs.call("ToggleRecord");
  },
});

pkg.createNonEventSchema({
  name: "Start Record",
  variant: "Exec",
  generateIO() {},
  async run() {
    await obs.call("StartRecord");
  },
});

pkg.createNonEventSchema({
  name: "Stop Record",
  variant: "Exec",
  generateIO() {
    //io.dataOutput({
    //   id: "outputPath",
    //   name: "Output Path",
    //   type: types.list(types.string()),
    // });
  },
  async run() {
    await obs.call("StopRecord");
    // ctx.setOutput("outputPath", data.outputPath);
  },
});

pkg.createNonEventSchema({
  name: "Toggle Record Paused",
  variant: "Exec",
  generateIO() {},
  async run() {
    await obs.call("ToggleRecordPause");
  },
});

pkg.createNonEventSchema({
  name: "Pause Record",
  variant: "Exec",
  generateIO() {},
  async run() {
    await obs.call("PauseRecord");
  },
});

pkg.createNonEventSchema({
  name: "Resume Record",
  variant: "Exec",
  generateIO() {},
  async run() {
    await obs.call("ResumeRecord");
  },
});

pkg.createNonEventSchema({
  name: "Get Media Input Status",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataOutput({
      id: "mediaState	",
      name: "Media State",
      type: t.string(),
    });
    io.dataOutput({
      id: "mediaDuration",
      name: "Media Duration",
      type: t.int(),
    });
    io.dataOutput({
      id: "mediaCursor",
      name: "Media Cursor",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetMediaInputStatus", {
      inputName: ctx.getInput("inputName"),
    });
    ctx.setOutput("mediaState", data.mediaState);
    ctx.setOutput("mediaDuration", data.mediaDuration);
    ctx.setOutput("mediaCursor", data.mediaCursor);
  },
});

pkg.createNonEventSchema({
  name: "Set Media Input Cursor",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "mediaCursor",
      name: "Media Cursor",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("SetMediaInputCursor", {
      inputName: ctx.getInput("inputName"),
      mediaCursor: ctx.getInput("mediaCursor"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Offset Media Input Cursor",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "mediaCursorOffset",
      name: "Media Cursor Offset",
      type: t.int(),
    });
  },
  async run({ ctx }) {
    obs.call("OffsetMediaInputCursor", {
      inputName: ctx.getInput("inputName"),
      mediaCursorOffset: ctx.getInput("mediaCursorOffset"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Trigger Media Input Action",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
    io.dataInput({
      id: "mediaAction",
      name: "Media Action",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("TriggerMediaInputAction", {
      inputName: ctx.getInput("inputName"),
      mediaAction: ctx.getInput("mediaAction"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Get Studio Mode Enabled",
  variant: "Exec",
  generateIO(io) {
    io.dataOutput({
      id: "studioModeEnabled",
      name: "Studio Mode Enabled",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    const data = await obs.call("GetStudioModeEnabled");
    ctx.setOutput("studioModeEnabled", data.studioModeEnabled);
  },
});

pkg.createNonEventSchema({
  name: "Set Studio Mode Enabled",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "studioModeEnabled",
      name: "Studio Mode Enabled",
      type: t.bool(),
    });
  },
  async run({ ctx }) {
    obs.call("SetStudioModeEnabled", {
      studioModeEnabled: ctx.getInput("studioModeEnabled"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Open Input Properties Dialogue",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("OpenInputPropertiesDialog", {
      inputName: ctx.getInput("inputName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Open Input Filters Dialogue",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("OpenInputFiltersDialog", {
      inputName: ctx.getInput("inputName"),
    });
  },
});

pkg.createNonEventSchema({
  name: "Open Input Interact Dialogue",
  variant: "Exec",
  generateIO(io) {
    io.dataInput({
      id: "inputName",
      name: "Input Name",
      type: t.string(),
    });
  },
  async run({ ctx }) {
    obs.call("OpenInputInteractDialog", {
      inputName: ctx.getInput("inputName"),
    });
  },
});

//GetMonitorList has array of objects

// pkg.createNonEventSchema({
//   name: "Open Video Mix Projector",
//   variant: "Exec",
//   generateIO(io) {
//    io.dataInput({
//       id: "videoMixType",
//       name: "Video Mix Type",
//       type: types.string(),
//     });
//    io.dataInput({
//       id: "monitorIndex",
//       name: "Monitor Index",
//       type: types.int(),
//     });
//    io.dataInput({
//       id: "projectorGeometry",
//       name: "Projector Geometry",
//       type: types.string(),
//     });
//   },
//   async run({ ctx }) {
//     obs.call("OpenVideoMixProjector", {
//       videoMixType: ctx.getInput("videoMixType"),
//       monitorIndex: ctx.getInput("monitorIndex"),
//       projectorGeometry: ctx.getInput("projectorGeometry"),
//     });
//   },
// });

// pkg.createNonEventSchema({
//   name: "Open Source Projector",
//   variant: "Exec",
//   generateIO(io) {
//    io.dataInput({
//       id: "sourceName",
//       name: "Source Name",
//       type: types.string(),
//     });
//    io.dataInput({
//       id: "monitorIndex",
//       name: "Monitor Index",
//       type: types.int(),
//     });
//    io.dataInput({
//       id: "projectorGeometry",
//       name: "Projector Geometry",
//       type: types.string(),
//     });
//   },
//   async run({ ctx }) {
//     obs.call("OpenSourceProjector", {
//       sourceName: ctx.getInput("sourceName"),
//       monitorIndex: ctx.getInput("monitorIndex"),
//       projectorGeometry: ctx.getInput("projectorGeometry"),
//     });
//   },
// });
