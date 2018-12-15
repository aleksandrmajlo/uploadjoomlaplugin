<template>

    <div class="dir">
         <transition name="fade">
            <div class="response" v-show="response" >
               Добалено
            </div>
         </transition>

        <div class="panel-header">
            <div @click="close"  class="close_app">
                <v-icon name="times-circle" scale="1.5" />
            </div>
            <div class="title">Файловый менеджер</div>
        </div>

        <Actions/>

        <div class="block_images" id="block_images">
            <div class="images">

                <div class="image" v-for="(item,key) in $store.state.images" :key="key">
                    <div class="wrap_image">
                        <span class="trash-alt" @click="removeFile(item,key)">
                            <v-icon name="trash-alt"/>
                        </span>
                        <div class="photo">
                            <img :src=" $store.state.path+item">
                        </div>
                        <div class="name">
                            {{item}}
                        </div>
                        <div class="addGroups_wrap" v-if="$store.state.active_ind||$store.state.active_ind===0">
                                <span class="addGroups" @click="addGroups(item,key)"> 
                                    <v-icon name="plus-circle" />
                                    <span>в группу </span> 
                                    <strong>{{$store.state.groups[$store.state.active_ind].title}}</strong>
                                </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="panel-header">
            <br/>
        </div>
    </div>

</template>
<script>
    import Actions from "./Actions.vue";

    export default {
        data (){
            return {
                response:false
            }
        },

        components: {
            Actions
        },
        mounted() {
            this.$store.dispatch('getPhoto')
        },
        methods: {
            removeFile(item,key) {
                this.$store.dispatch('removePhoto',{key:key,item:item})
            },
            addGroups(item,key) {
                this.response=true;
                setTimeout(() => {
                    this.response=false;
                },2000 );
                this.$store.commit('addPhotogroup',{key:key,item:item})
            },
            close() {
                this.$store.commit("close");
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dir {
        position: absolute;
        width: 100%;
        min-height: 500px;
        left: 0;
        // top: -300px;
        bottom: 0;
        
        z-index: 1000;
        background: azure;
        overflow: hidden;
        .response{
             position: fixed;
             z-index: 100000; 
             top:100px;
             right: 10px;
             background: #fff;
             min-width: 200px;
             padding: 10px;
             text-align: center;
             border:10px;
             z-index: 30;
             -webkit-box-shadow: 0 0 6px 2px rgba(0,0,0,0.5) ;
             box-shadow: 0 0 6px 2px rgba(0,0,0,0.5) ;
            text-shadow: 1px 1px 1px rgba(0,0,0,0.2) ;
        }
        .panel-header {
            position: relative;
            padding: 8px;
            background: #0381cb;
            color: #fff;
            .close_app {
                cursor: pointer;
                position: absolute;
                right: 10px;
                top: 5px;
                color:#fff;
            }
        }

        .block_images {
            position: relative;
            overflow-y: scroll;
            height: 440px;
            padding: 20px;
            padding-bottom: 40px;
            min-height: 100%;
        }

        .images {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content:  space-around;
            .image {
                width: 20%;
                .wrap_image{
                  border:1px solid;
                  padding: 10px;
                  padding-top:25px;
                  margin: 10px;
                  box-sizing: border-box;
                  border-radius:10px; 
                  position: relative;
                  background: #fff;
                }
                .photo {
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                    margin-bottom: 10px;
                }
                .name {
                    text-align: center;
                    margin-bottom: 10px;
                }
                .actions {
                    text-align: center;
                    label {
                        font-weight: bold;
                        display: inline-block;
                        margin-right: 5px;
                    }
                }

            }
        }
        .addGroups_wrap{
           .addGroups{
                cursor: pointer;
                display:flex;
                align-items: center;
                &>*{
                    display: inline-block;
                    margin-right: 5px; 
                }
           }
        }
        
    }
</style>


