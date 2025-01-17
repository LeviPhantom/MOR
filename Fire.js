import firebaseKeys from "./config";
import firebase from "firebase";
class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseKeys);
    }
  }

  addPost = async ({
    address,
    description,
    localUri,
    latitude,
    longitude,
    email,
  }) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);

    return new Promise((res, rej) => {
      this.firestore
        .collection("post")
        .add({
          address,
          latitude,
          longitude,
          description,
          email,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };
  uploadPhotoAsync = async (uri) => {
    const path = `photo/${this.uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const reponse = await fetch(uri);
      const file = await reponse.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };
  get firestore() {
    return firebase.firestore();
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}
Fire.shared = new Fire();
export default Fire;
