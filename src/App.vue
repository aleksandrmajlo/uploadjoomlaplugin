<template>
    <div id="app">
        <transition name="fade">
            <div class="succes_app" v-show="$store.state.succes">
                Информация сохранена.
            </div>
        </transition>
        <div class="app-container">
            <div>
                <button @click.prevent="add_group">Добавить группу</button>
            </div>
            <div class="app-groups">
                <draggable class="items" v-model="items" :options="{draggable:'.group_item'}" >
                    <div v-for="(value, key) in items"  :key="value.sort" class="group_item ">
                        <Group  :ind="key"></Group>
                    </div>
                </draggable>
            </div>
            <div class="app-save">
                <button @click.prevent="save">Сохранить</button>
            </div>
            <dir v-show="$store.state.show_dir"></dir>
        </div>
    </div>
</template>
<script>
    import product from "./components/Product.vue";
    import Group from "./components/Group.vue";
    import dir from "./components/Dir.vue";
    import draggable from 'vuedraggable'
    export default {
        name: "app",
        components: {
            Group,
            dir,
            product,
            draggable
        },
        computed: {
            items: {
                get() {
                    return this.$store.state.groups;
                },
                set(value) {
                    this.$store.commit('updateSortGroup', value)
                }
            },
        },
        mounted() {
            this.$store.dispatch('getItems')
        },
        methods: {
            add_group() {
                this.$store.commit("add_groups");
            },
            save() {
                this.$store.dispatch('save');
            },
            test() {
                this.$store.dispatch('getItems')
            }
        }
    };
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: auto;
        background: #ffffff;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        img{
             max-width: 100%;
             height: auto;
        }
         label[for="file"]{
            cursor: pointer !important;
         }
        .succes_app {
            position: fixed;
            top: 100px;
            right: 10px;;
            z-index: 100000; 
            background: #fff;
            min-width: 200px;
            padding: 10px;
            text-align: center;
            border: 10px;
            z-index: 30;
            -webkit-box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.5);
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);

        }
        div {
            box-sizing: border-box;
        }
        .app-container {
            position: relative;
            .app-groups {
                margin-top: 10px;
                margin-bottom: 20px;
            }
        }
        input, textarea, select, img, button {
            float: none !important;
            width: auto;
            margin: 0;
            box-sizing: border-box;
            max-width: 100%;
            min-height: 30px;
        }
        .app-save {
            button {
                background: #0199d9;
                color: #fff;
                padding: 6px 12px;
                font-weight: bold;
                font-size: 120%;
                border: none;
                cursor: pointer;
                outline: none;
                border-radius: 10px;
                min-width: 200px;
                min-height: 40px;
                text-transform: uppercase;
            }
        }
    }

    .trash-alt {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        color: red;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

</style>
