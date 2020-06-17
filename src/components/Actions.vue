<template>
    <div class="panel-actions">
        <div class="wrap_panel">
            <div class="item file-upload">
                <file-upload
                        class="btn_upload"
                        extensions="gif,jpg,jpeg,png,webp"
                        :post-action="post"
                        accept="image/png, image/gif, image/jpeg, image/webp"
                        @input-file="inputFile"
                        ref="upload">
                    <v-icon name="upload"/>
                    <span>Загрузить +</span>
                </file-upload>
            </div>
        </div>
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
                        console.log('succes')
                        this.$store.dispatch('getPhoto');
                        let objDiv = document.getElementById('block_images');
                        objDiv.scrollTop = objDiv.scrollHeight;
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
    .panel-actions {
        box-sizing: border-box;
        z-index: 10;
        padding: 10px;
        -webkit-box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.3);
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);

        .wrap_panel {
            display: flex;
            flex-wrap: wrap;

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
        }
    }
</style>

