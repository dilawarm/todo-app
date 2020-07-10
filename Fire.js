import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2zqmQ-_8Vv-IRCRO-sqY77pB1G0bwpuE",
    authDomain: "todoapp-559dd.firebaseapp.com",
    databaseURL: "https://todoapp-559dd.firebaseio.com",
    projectId: "todoapp-559dd",
    storageBucket: "todoapp-559dd.appspot.com",
    messagingSenderId: "874972159946",
    appId: "1:874972159946:web:c2df14739aaf223e65f933",
    measurementId: "G-TWWRN4YPPQ"
}

class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");
    
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()});
            });
            callback(lists);
        });
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }    

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase
                .firestore()
                .collection("users")
                .doc(this.userId)
                .collection("lists");
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;