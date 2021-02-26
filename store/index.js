// vuexのストアをモジュールモードで書く。
// https://qiita.com/y-miine/items/028c73aa3f87e983ed4c
import { vuexfireMutations} from 'vuexfire';

export const mutations = {
  ...vuexfireMutations
};