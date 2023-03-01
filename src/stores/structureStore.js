import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core';

export let useStructureStore = defineStore('structure', {

    state() {
        return {
            pwd : '~',
            treeData: useStorage('home-structure', {
                '~': { name: '~', color: 'red', files: {},  folders: {
                    'bookmarks': { name: 'Bookmarks', color:'', files: {},  folders: {} },
                } }
            })

        };
    },

    getters: {
        bookmarks() {
            console.log( this.treeData['~'].folders.bookmarks );
            return this.treeData['~'].folders.bookmarks;
        }
    },

    actions: {

        ls() {
            
            let path = this.pwd.split('/');
            let response = this.recursiveSave( this.treeData, path, {}, true, false );

            console.log({response});
            return {
                response: true,
                folders: response.folders,
                files: response.files
            };

        },



        findFolderPosition( pwd )
        {
            let path = pwd.split('/');
            let files = this.data;

            path.forEach(dir => {
                if( dir.length > 0 && files !== undefined ) {
                    if( files[dir] !== undefined){
                        files = files[dir].contents;
                    }
                }
            });

        },

        /**
         * 
         * @param {object} treeFolders  
         * @param {array} pwd 
         * @param {object} data 
         */
        recursiveSave( treeFolders, pwd, data, isFolder = true, toCreate = true ) {

            let folder = pwd.shift();

            if (pwd.length == 0) {
                if( toCreate === true ) {
                    if( isFolder === true ) {
                        console.log(data.params.color);
                        let color = (data.params.color === undefined) ? '' : data.params.color;
                        const newFolder = { name: data.value, colors: color, folders: {}, files: {} };
                        treeFolders[folder].folders[ data.value ] = newFolder;
                    }
                    else {
                        const newFile = { name: data.value, link: data.params.link };
                        treeFolders[folder].files[ data.value ] = newFile;
                    }
                    return treeFolders;
                }
                else {
                    return treeFolders[folder];
                }
                
            }
            else if( treeFolders[folder] === undefined ) {
                return false;
            }
            else {
                return this.recursiveSave( treeFolders[folder].folders, pwd, data, isFolder, toCreate);
            }
            

        },

        saveToLocalStorage(){
            localStorage.setItem('home-structure', this.treeData);
        },

        createFile( data ) {
            let path = this.pwd.split('/');

            let response = this.recursiveSave( this.treeData, path, data, false );

            if( response !== false ) {
                this.data = response;
            }

            this.saveToLocalStorage();

            return {
                response: true,
            };
        },

        createFolder( data ) {
            
            let path = this.pwd.split('/');

            let response = this.recursiveSave( this.treeData, path, data );

            if( response !== false ) {
                this.data = response;
            }

            this.saveToLocalStorage();

            return {
                response: true,
            };

        },

        getPwdArray() {
            return this.pwd.split('/');
        },

        forward(folder) {

            let path = this.getPwdArray()
            path.push(folder);

            if( folder[0] === '~') {
                path = ['~'];
                if( folder.length > 1 ) {
                    path = folder.split('/');
                } 
            }

            let folders = this.treeData;
            let folderFound = true

            path.forEach(dir => {
                if( dir.length > 0 && folders !== undefined ) {
                    console.log({folders});
                    if( folders[dir] !== undefined){
                        folders = folders[dir].folders;
                    }
                    else {
                        folderFound = false;
                    }
                }
            });

            if( folderFound === true ) {

                if( folder[0] === '/') {
                    this.pwd = folder;
                }
                else {
                    this.pwd = path.join('/');
                }

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
            
            if( this.pwd === '~' ) {
                return {
                    response: false,
                    msg: 'you cannot go back any further... idiot.'
                };
            }

            let path = this.getPwdArray();
            path.pop();

            let pwdStr = path.join('/');
            if( path.length === 0 ) {
                pwdStr = '~';
            }

            return this.forward( pwdStr );

        }
    } 

})