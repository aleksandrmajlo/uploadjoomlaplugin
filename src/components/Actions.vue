<template>
    <div class="item file-upload">
        <file-upload
                class="btn_upload"
                extensions="gif,jpg,jpeg,png,webp"
                :post-action="post"
                :multiple="true"
                accept="image/png, image/gif, image/jpeg, image/webp"
                @input-file="inputFile"
                ref="upload">
            <v-icon name="upload"/>
            <span>Загрузить +</span>
        </file-upload>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                post: process.env.VUE_APP_ENV_AJAX
            }
        },
        methods: {
            inputFile: function (newFile, oldFile) {
                if (newFile && oldFile) {
                    // update
                    if (newFile.active && !oldFile.active) {
                        // beforeSend
                    }
                    if (newFile.progress !== oldFile.progress) {
                        // progress
                    }
                    if (newFile.error && !oldFile.error) {
                        // error
                    }
                    if (newFile.success && !oldFile.success) {
                        this.$store.dispatch('getPhoto');
                        // let objDiv = document.getElementById('block_images');
                        // objDiv.scrollTop = objDiv.scrollHeight;
                        this.$store.commit('addPhotogroupFast', {
                            item: newFile.xhr.response,
                            title:newFile.name})

                    }
                }
                // Automatic upload
                if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                    if (!this.$refs.upload.active) {
                        this.$refs.upload.active = true
                    }
                }
            },
        }
    };
</script>
<style lang="scss" scoped>
    .item {
        display: inline-block;
    }
    .file-upload {
        font-weight: bold;
        cursor: pointer;
        span.btn_upload {
            span {
                display: inline-block;
                margin-left: 5px;
            }
        }

        label {
            cursor: pointer !important;
        }
    }
</style>

