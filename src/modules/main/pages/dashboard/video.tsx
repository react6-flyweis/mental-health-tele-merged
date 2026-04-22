import AgoraRTC, {
  type IAgoraRTCClient,
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react";

type Props = {
  connection: {
    appId: string;
    channelName: string;
    token: string;
    uid: number;
  };
};

export default function VideoCall({ connection }: Props) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const remoteRef = useRef<HTMLDivElement | null>(null);
  const initialized = useRef(false);
  const clientRef = useRef<IAgoraRTCClient | null>(null);

  const [localVideoTrack, setLocalVideoTrack] =
    useState<ICameraVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<IMicrophoneAudioTrack | null>(null);

  const [remoteUser, setRemoteUser] = useState<any | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    if (initialized.current || typeof window === "undefined") return;
    initialized.current = true;

    let videoTrack: ICameraVideoTrack;
    let audioTrack: IMicrophoneAudioTrack;

    const init = async () => {
      try {
        const { appId, channelName, token, uid } = connection;

        // Initialize client only on client side
        const client = AgoraRTC.createClient({
          mode: "rtc",
          codec: "vp8",
        });
        clientRef.current = client;

        await client.join(appId, channelName, token, uid);

        videoTrack = await AgoraRTC.createCameraVideoTrack();
        audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

        setLocalVideoTrack(videoTrack);
        setLocalAudioTrack(audioTrack);

        await client.publish([videoTrack, audioTrack]);

        videoTrack.play(localRef.current!);

        client.on("user-published", async (user: any, mediaType: any) => {
          await client.subscribe(user, mediaType);
          setRemoteUser(user);

          if (mediaType === "video") {
            user.videoTrack?.play(remoteRef.current!);
          }

          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        });

        client.on("user-unpublished", () => {
          setRemoteUser(null);
        });
      } catch (err: any) {
        if (err.code !== "OPERATION_ABORTED") {
          console.error("Agora error:", err);
        }
      }
    };

    init();

    return () => {
      videoTrack?.close();
      audioTrack?.close();
      if (clientRef.current) {
        clientRef.current.removeAllListeners();
        clientRef.current.leave();
      }
    };
  }, [connection]);

  const toggleMute = async () => {
    if (!localAudioTrack) return;
    await localAudioTrack.setEnabled(isMuted);
    setIsMuted(!isMuted);
  };

  const toggleCamera = async () => {
    if (!localVideoTrack) return;
    await localVideoTrack.setEnabled(isCameraOff);
    setIsCameraOff(!isCameraOff);
  };

  const leaveCall = async () => {
    localAudioTrack?.close();
    localVideoTrack?.close();
    if (clientRef.current) {
      await clientRef.current.leave();
    }

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="h-screen bg-black relative text-white">
      <div
        ref={remoteRef}
        className="w-full h-full flex items-center justify-center"
      >
        {!remoteUser && (
          <p className="text-gray-400">Waiting for other user...</p>
        )}
      </div>

      <div
        ref={localRef}
        className="absolute bottom-24 right-4 w-44 h-32 rounded-lg overflow-hidden border border-white/20"
      />

      <div className="absolute bottom-0 w-full flex justify-center gap-6 p-4 bg-black/60 backdrop-blur">
        <button
          onClick={toggleMute}
          className="px-4 py-2 bg-gray-700 rounded-full"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>

        <button
          onClick={toggleCamera}
          className="px-4 py-2 bg-gray-700 rounded-full"
        >
          {isCameraOff ? "Camera On" : "Camera Off"}
        </button>

        <button
          onClick={leaveCall}
          className="px-5 py-2 bg-red-500 rounded-full"
        >
          End Call
        </button>
      </div>
    </div>
  );
}
