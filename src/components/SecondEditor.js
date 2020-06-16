import React, { useState } from 'react';
import { useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';

// pass projectId and openedPath 
function SecondEditor({ project_id, openedFile }) {
    const [meditor, setMeditor] = useState();

    // component mounted
    useEffect(() => {
        var meditor = monaco.editor.create(document.getElementById('firepad-container'),
            {
                language: 'javascript',
            }
        );
        setMeditor(meditor);
    }, []);

    useEffect(() => {
        //// Initialize Firebase.
        //// TODO: replace with your Firebase project configuration.
        var config = {
            apiKey: "AIzaSyCxzxwV5KffQ9q0jPtZjLhKfvHndCq5Qfo",
            databaseURL: "https://cogether-project-collab.firebaseio.com/",
        };
        window.firebase.initializeApp(config);

        console.log(project_id);
        console.log(openedFile);

        // get firebase database reference; projectId, openedFile
        // var firepadRef = getExampleRef(project_id, openedFile);
        // var firepad = window.Firepad.fromCodeMirror(firepadRef, meditor)

        function getExampleRef(projectId, openedFile) {
            var ref = window.firebase.database().ref(projectId + '/' + openedFile); // TODO change child-path
            var hash = window.location.hash.replace(/#/g, '');
            if (hash) {
                ref = ref.child(hash);
            } else {
                ref = ref.push(); // generate unique location.
                window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
            }
            if (typeof console !== 'undefined') {
                console.log('Firebase data: ', ref.toString());
            }
            return ref;
        }
    }, [openedFile]);


    return (
        <div>
            <div 
            style={{ display: 'flex', flex: 2, border: "1px solid black", overflowX: "hidden", width: 100 }}
            id="firepad-container" ></div>
        </div>
    );
}

export default SecondEditor;