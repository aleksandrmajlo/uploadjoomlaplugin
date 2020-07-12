<template>
    <div class="Fast-file-upload" >
        <file-upload
                class="btn_upload"
                extensions="gif,jpg,jpeg,png,webp"
                :post-action="post"
                :multiple="true"
                accept="image/png, image/gif, image/jpeg, image/webp"
                @input-file="inputFile"
                ref="upload2">
            <v-icon name="upload"/>
            <span>+ c названием</span>
        </file-upload>
    </div>
</template>

<script>
    export default {
        name: "ActionFast",
        data() {
            return {
                post: process.env.VUE_APP_ENV_AJAX,
            }
        },
        created() {

        },
        mounted() {
        },
        methods: {
            inputFile: function (newFile, oldFile) {
                if (newFile && oldFile) {
                    if (newFile.active && !oldFile.active) {
                    }
                    if (newFile.progress !== oldFile.progress) {
                    }
                    if (newFile.error && !oldFile.error) {

                    }
                    if (newFile.success && !oldFile.success) {
                        this.$store.dispatch('getPhoto');
                        /*
                          что б передать в группу надо ловить название item
                         */
                        this.$store.commit('addPhotogroupFast', {
                            item: newFile.xhr.response,
                            title:newFile.name})
                    }
                }
                // Automatic upload
                if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                    if (!this.$refs.upload2.active) {
                        this.$refs.upload2.active = true
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .Fast-file-upload {
        font-weight: bold;
        cursor: pointer;
        margin-left: 20px;
        display: flex;
        min-width: 100px;
        max-width: 150px;
        height: 50px;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        /*-webkit-box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.5) inset, 4px 4px 8px 2px rgba(0, 0, 0, 0.2), 1px 1px 1px 0 rgba(0, 0, 0, 0.81);*/
        /*box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.5) inset, 4px 4px 8px 2px rgba(0, 0, 0, 0.2), 1px 1px 1px 0 rgba(0, 0, 0, 0.81);*/
    }
</style>