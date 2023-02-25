<script setup>

    import commandsAvailable from './data/commands.json';
    import Commandls from './components/Commandls.vue';
    import Bookmarks from './components/Bookmark.vue';
    import Help from './components/Help.vue';
    import Model from './components/Model.vue';
    import Message from './components/Message.vue';

    import { ref, reactive } from 'vue'

    import { useStructureStore } from "./stores/structureStore";

    let user = {
        name: 'Tom'
    };

    let structure = useStructureStore();

    let insertCommand = () => {

        if( commandInput.value === null || commandInput.value === '' || commandInput.value.length == 0 ) {
            return false;
        }
        else {
            let cmd = commandInput.value;
            let response = null;
            let data = analyseCommand(commandInput.value);
            console.log(data);
            //  if( this.commandsAvailable[ type ] !== undefined && cmds.length === 0 ) {
            if( ['help', 'bookmarks', 'specs', 'man', 'model', 'ls', 'cd'].indexOf(data.command) >= 0 ) {
             
                let component = data.command ;

                if ( data.command === 'cd') {
                    if( data.value === '..' ) {
                        response = structure.reverse();
                    }
                    else {
                        response = structure.forward(data.value);
                    }

                    component = 'message';
                    data.response = response;
                    
                }
                else if( data.command === 'ls' ) {
                    console.log(structure.ls());
                    data.response = structure.ls();
                }
             
                commands.push({
                    command: cmd,
                    component : component,
                    data: data,
                });
            }

            commandInput.value = '';

        }

        // keep scroolbar at the bottom to always show latest
        setTimeout(function(){ 
            var messageBody = document.querySelector('#terminal-content');
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        }, 100);

    }

    let analyseCommand = (cmd) => {

            let cmds = cmd.split(' ');
            
            let type = cmds.shift(); // remove command name
            let options = [];

            if( cmds[0] !== undefined && cmds[0][0] === '-' ) {
                options = cmds[0].split('');
                cmds.shift() // remove options
            }

            return {
                command: type,
                params : options,
                value: cmds.join(' '),
                path: structure.pwd,
            };
    };

    let historyPrev = () => {

    }

    let historyNext = () => {
        
    }

    let commandInput = ref('');

    let commands = reactive([
        {
            command : "bookmarks",
            component: 'bookmarks',
            data: analyseCommand('bookmarks')
        }
    ]);

    let history = {
        counter: 0,
        list: []
    };

</script>

<template>

    <div class="terminal-container" id="terminal">
        
        <!-- header -->
        <div class="terminal-header">
            {{ user.name }} @ <current-time></current-time>
        </div>

        <!-- content -->
        <div class="terminal-content" id="terminal-content">
            <div>
                <div v-for="(command, index) in commands" :key="index">

                    <div class="command-line">
                        <span class="username">{{ user.name }}</span>
                        <span class="path" v-if="command.data.path.length > 0"> : {{ command.data.path }}</span> 
                        <span class="username"> > </span>
                        <span class="command">{{ command.command }}</span>
                    </div>

                    <div class="command-line" v-if="command.components === 'notFound'">
                        <span class="command">Command not found</span>
                    </div>

                    <div class="command-result" v-else-if="command.components !== false">
                        <Message v-if="command.component === 'message'" :data="command.data"></Message>
                        <Commandls v-if="command.component === 'ls'" :data="command.data"></Commandls>
                        <Bookmarks v-if="command.component === 'bookmarks'"></Bookmarks>
                        <Help v-if="command.component === 'help'"></Help>
                        <Model v-if="command.component === 'model'" :search="analyseCommand(command.command)"></Model>
                    </div>
                </div>
            </div>
        </div>


        <!-- footer -->
        <div class="terminal-footer">
            <form action="" name="command-me" @submit.prevent="insertCommand">
                 <input v-on:keyup.up="historyPrev" 
                        v-on:keyup.down="historyNext"
                        v-model="commandInput"
                        type="text" 
                        class="command-type">
            </form>
        </div>

    </div>
</template>