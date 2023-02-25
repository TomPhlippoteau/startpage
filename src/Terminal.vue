<script setup>

    import commandsAvailable from './data/commands.json';
    import Bookmarks from './components/Bookmark.vue';
    import Help from './components/Help.vue';
    import Model from './components/Model.vue';
    import { ref, reactive } from 'vue'

    let user = {
        name: 'Tom'
    };

    let insertCommand = () => {

        if( commandInput.value === null || commandInput.value === '' || commandInput.value.length == 0 ) {
            return false;
        }
        else {
            let cmd = commandInput.value;
        
            let data = analyseCommand(commandInput.value);
            console.log(data);
            //  if( this.commandsAvailable[ type ] !== undefined && cmds.length === 0 ) {
            if( ['help', 'bookmarks', 'specs', 'man', 'model'].indexOf(data.command) >= 0 ) {
                commands.push({
                    command: cmd,
                    components: data.command,
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
            components: "bookmarks", 
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
                        <span class="username">{{ user.name }} : </span>
                        <span class="command">{{ command.command }}</span>
                    </div>

                    <div class="command-line" v-if="command.components === 'notFound'">
                        <span class="command">Command not found</span>
                    </div>

                    <div class="command-result" v-else-if="command.components !== false">
                        <Bookmarks v-if="command.components === 'bookmarks'"></Bookmarks>
                        <Help v-if="command.components === 'help'"></Help>
                        <Model v-if="command.components === 'model'" :search="analyseCommand(command.command)"></Model>
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