import firebase from 'firebase';

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// デフォルトエクスポート。
// 関数、またはclassを外部から利用できるようにする。
// 生成済みのインスタンスでもOK
// 呼び出し元は `import {name} from './{filename}'` で利用できる。
// デフォルトエクスポートは1ファイル1つの値のみ使える。
export default firebase;

// 複数の値をエクスポートする場合は「名前付きエクスポート」を利用する。
// export { hoge1, hoge2　};