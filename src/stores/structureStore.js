import { defineStore } from "pinia";

export let useStructureStore = defineStore('structure', {

    state() {
        return {
            pwd : '',
            data: {
                'bookmarks': { type: 'folder', name: 'bookmarks', colors:'red', contents: {
                        'general': { type: 'folder', name: 'General', colors:'', contents: [] },
                        'medias': { type: 'folder', name: 'Medias', colors:'', contents: [] },
                        'fun stuff': { type: 'folder', name: 'Fun stuff', colors:'', contents: [] }
                    } ,
                }
            }
        };
    },

    actions: {

        ls() {

            let files = this.data;
            let path = this.pwd.split('/');

            path.forEach(dir => {
                if( dir.length > 0 && files !== undefined ) {
                    if( files[dir] !== undefined){
                        files = files[dir].contents;
                    }
                }
            });

            return {
                response: true,
                files: files,
            };

        },

        forward(folder) {

            let path = this.pwd.split('/');
            path.push(folder);

            if( folder[0] === '/') {
                path = folder.split('/');
            }
        
            let folders = this.data;
            let folderFound = true;

            path.forEach(dir => {
                if( dir.length > 0 && folders !== undefined ) {
                    console.log({folders});
                    if( folders[dir] !== undefined){
                        folders = folders[dir].contents;
                    }
                    else {
                        folderFound = false;
                    }
                }
            });

            if( folderFound === true ) {
                this.pwd = path.join('/');

                return {
                    response: true,
                    msg: 'you are now in folder : ' + this.pwd,
                };
            }

            return {
                response: false,
                msg: 'folder does not exist ' + folder,
            }; 


        },

        reverse() {
            
            if( this.pwd === '' ) {
                return {
                    response: false,
                    msg: 'you cannot go back any further... idiot.'
                };
            }

            let path = this.pwd.split('/');
            path.pop();

            return this.forward( path.join('/'));

        }
    } 

})