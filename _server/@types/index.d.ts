declare global {
  interface PlayerMp {
    _id: number;
    _sex: "male" | "female";
    _lastPosition: { x: number; y: number; z: number; heading: number } | null;
  }

  type RPCEvent = {
    environment: string;
    id?: string;
    player?: PlayerMp;
  };
}

export {};
