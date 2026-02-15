import { Audio } from "expo-av";

const DEFAULT_MODEL_ID = "vits-piper-en_US-lessac-medium";
const DEFAULT_MODEL_URL =
  "https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-en_US-lessac-medium.tar.bz2";

class TTSManager {
  private sound: Audio.Sound | null = null;
  private isInitialized = false;
  private isModelReady = false;

  private RunAnywhere: any;
  private ONNX: any;
  private ModelCategory: any;
  private ModelArtifactType: any;
  private SDKEnvironment: any;

  async initialize() {
    if (this.isInitialized) return;

    try {
      console.log("Loading RunAnywhere");
      const Core = await import("@runanywhere/core");
      const Onnx = await import("@runanywhere/onnx");

      this.RunAnywhere = Core.RunAnywhere;
      this.SDKEnvironment = Core.SDKEnvironment;
      this.ModelCategory = Core.ModelCategory;
      this.ONNX = Onnx.ONNX;
      this.ModelArtifactType = Onnx.ModelArtifactType;

      await this.RunAnywhere.initialize({
        environment: this.SDKEnvironment.Development,
        apiKey: "dev-key",
      });

      this.ONNX.register();

      await this.ONNX.addModel({
        id: DEFAULT_MODEL_ID,
        name: "Piper US English (Medium)",
        url: DEFAULT_MODEL_URL,
        modality: this.ModelCategory.SpeechSynthesis,
        artifactType: this.ModelArtifactType.TarBz2Archive,
      });

      this.isInitialized = true;
      console.log("RunAnywhere initialized and ONNX registered");
    } catch (error) {
      console.error("Failed to initialize RunAnywhere ", error);
      throw new Error("Failed");
    }
  }

  async prepareModel() {
    if (!this.isInitialized) await this.initialize();
    if (this.isModelReady) return;

    try {
      const isDownloaded =
        await this.RunAnywhere.isModelDownloaded(DEFAULT_MODEL_ID);
      if (!isDownloaded) {
        console.log("Downloading TTS model");
        await this.RunAnywhere.downloadModel(DEFAULT_MODEL_ID);
        console.log("TTS model downloaded");
      }

      await this.RunAnywhere.loadTTSVoice(DEFAULT_MODEL_ID);
      this.isModelReady = true;
      console.log("TTS model loaded");
    } catch (error) {
      console.error("TTS model failed to load", error);
      throw error;
    }
  }

  async synthesizeAndPlay(
    text: string,
    onPlaybackStatusUpdate?: (status: any) => void,
  ): Promise<Audio.Sound | null> {
    try {
      await this.prepareModel();

      console.log("Synthesizing text...");
      const result = await this.RunAnywhere.synthesize(text, {
        voice: DEFAULT_MODEL_ID,
      });

      if (!result.audioData) {
        throw new Error("No audio data returned from synthesis");
      }

      const wavPath = await this.RunAnywhere.Audio.createWavFromPCMFloat32(
        result.audioData,
        result.sampleRate || 22050,
      );

      console.log("Audio synthesized to:", wavPath);

      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: "file://" + wavPath },
        { shouldPlay: true },
        onPlaybackStatusUpdate,
      );

      this.sound = sound;
      return sound;
    } catch (error) {
      console.error("TTS Synthesis/Playback error ", error);
      if (error instanceof Error) {
        throw error;
      }
      return null;
    }
  }

  async stop() {
    if (this.sound) {
      await this.sound.stopAsync();
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }

  async pause() {
    if (this.sound) {
      await this.sound.pauseAsync();
    }
  }

  async resume() {
    if (this.sound) {
      await this.sound.playAsync();
    }
  }

  async setPosition(millis: number) {
    if (this.sound) {
      await this.sound.setPositionAsync(millis);
    }
  }
}

export const ttsManager = new TTSManager();
