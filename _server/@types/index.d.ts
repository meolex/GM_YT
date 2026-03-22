declare global {
  interface PlayerMp {
    _id: number;
    _sex: "male" | "female";
  }

  type RPCEvent = {
    environment: string;
    id?: string;
    player?: PlayerMp;
  };
}

export {};
