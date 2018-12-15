<template>
    <div class="group">
       <span class="trash-alt" @click="removeGroup">
              <v-icon name="trash-alt"/>
        </span>

        <div class="input">
            <strong>Название:</strong>
            <input type="text" class="input_title" @input="setTitle" :value="title">
        </div>

        <draggable class="items" v-model="items" :options="{draggable:'.item'}">
                <div v-for="(item,key) in items" :key="item.sort" class="item">
                    <div class="wrap_item">

                    <span class="trash-alt" @click="removePhoto(key)">
                       <v-icon name="trash-alt"/>
                    </span>

                        <div class="photo">
                            <img :src="$store.state.path+item.photo">
                        </div>
                        <div class="name">
                            <input type="text" :value="item.title" @input="setPhotoTitle($event,key)">
                        </div>
                    </div>
                </div>
        </draggable>
        <div class="addItem" @click="addItem">
            <span>+</span>
        </div>
    </div>
</template>
<script>

    import draggable from 'vuedraggable'

    export default {
        props: ["ind"],
        components: {
            draggable,
        },
        computed: {
            title() {
                console.log(this.ind)
                return this.$store.state.groups[this.ind].title;
            },
            items: {
                get() {
                    return this.$store.state.groups[this.ind].items;
                },
                set(value) {
                    this.$store.commit('updateSortItemsinGroup', {
                        value: value,
                        ind: this.ind
                    })
                }
            },

        },
        methods: {

            // устанавливаем название группы
            setTitle(event) {
                let v = event.target.value;
                this.$store.commit("setTitle", {val: v, ind: this.ind});
            },

            // добавление - открытие менеджера файлов
            addItem() {
                this.$store.commit("addItem", this.ind);
            },

            // удалить фото
            removePhoto(key) {
                this.$store.commit("removePhotoinGroup", {
                    ind: this.ind,
                    key: key
                });
            },

            // установить название фото
            setPhotoTitle(event, key) {
                let v = event.target.value;
                this.$store.commit('setPhotoTitle', {
                    ind: this.ind,
                    v: v,
                    key: key
                })
            },
            // удалить полностью группу
            removeGroup() {
                this.$store.commit('removeGroup', {
                    ind: this.ind,
                })
            }
        },
        mounted() {
        }
    };
</script>
<style lang="scss" scoped>
    .group {
        padding: 15px;
        margin-top: 20px;
        position: relative;

        -webkit-box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, 0.2),
        1px 1px 1px 0 rgba(0, 0, 0, 0.81);
        box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, 0.2),
        1px 1px 1px 0 rgba(0, 0, 0, 0.81);
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);

        .input {
            text-align: center;
            margin-bottom: 20px;
            strong {
                display: inline-block;
                margin-right: 20px;
            }
        }
        .addItem {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 100px;
            max-width: 150px;
            min-height: 50px;
            text-overflow: ellipsis;
            background: #0199d9;
            -webkit-box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.5) inset,
            4px 4px 8px 2px rgba(0, 0, 0, 0.2), 1px 1px 1px 0 rgba(0, 0, 0, 0.81);
            box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.5) inset,
            4px 4px 8px 2px rgba(0, 0, 0, 0.2), 1px 1px 1px 0 rgba(0, 0, 0, 0.81);
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            span {
                color: blanchedalmond;
                font-size: 40px;
                font-weight: bolder;
            }
        }
        [type="text"] {
            padding: 6px 12px;
            min-width: 300px;
        }
        .items {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            .item {
                width: 20%;
                position: relative;
                .wrap_item {
                    border: 1px solid;
                    padding: 10px;
                    padding-top: 25px;
                    margin: 10px;
                    box-sizing: border-box;
                    border-radius: 10px;
                    position: relative;
                    text-align: center;
                    .photo {
                        margin-bottom: 10px;
                        img {
                            max-width: 100%;
                            height: auto;
                        }
                    }
                    .name {
                        input {
                            min-width: inherit;
                        }
                    }
                }
            }
        }
    }
</style>


