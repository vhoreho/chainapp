import { ECPairAPI, ECPairFactory } from "ecpair";
import * as tinysecp from "tiny-secp256k1";

const ECPair: ECPairAPI = ECPairFactory(tinysecp);

export const keyPair = ECPair.makeRandom();
