<template>
    <div class="panel-actions">
        <div class="wrap_panel">
            <div class="item file-upload">

                <file-upload
                        class="btn_upload"
                        extensions="gif,jpg,jpeg,png,webp"
                        :post-action="post"
                        accept="image/png, image/gif, image/jpeg, image/webp"
                        @input="inputUpdate"
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
        computed: {
            post() {
                return process.env.VUE_APP_ENV_AJAX;
            }
        },
        methods: {

            inputUpdate(files) {
                // console.log('update');
                // this.$store.commit("updatePhotos", files);
                setTimeout(()=>{
                    
                    this.$store.dispatch('getPhoto');
                    let objDiv = document.getElementById('block_images');
                    objDiv.scrollTop = objDiv.scrollHeight;

                },1000)
            },

            inputFile(newFile, oldFile) {

                console.log(newFile && !oldFile)
                console.log(newFile && oldFile)

                if (newFile && !oldFile) {

                    // add

                    /*
                    if (newFile.active !== oldFile.active) {
                        if (newFile.size >= 0 && newFile.size < 100 * 1024) {
                            newFile = this.$refs.upload.update(newFile, {error: 'size'})
                        }
                    }
                    if (newFile.progress !== oldFile.progress) {
                        // console.log('progress', newFile.progress, newFile)
                    }
                    if (newFile.error !== oldFile.error) {
                        // console.log('error', newFile.error, newFile)
                    }
                    if (newFile.success !== oldFile.success) {
                        console.log('success', newFile.success, newFile)

                        this.$store.dispatch('getPhoto');

                        setTimeout(()=>{
                            let objDiv = document.getElementById('block_images');
                            objDiv.scrollTop = objDiv.scrollHeight;
                        },2000)

                    }
                    */


                }
                if (newFile && oldFile) {
                    
                    /*
                    if (newFile.active !== oldFile.active) {
                        if (newFile.size >= 0 && newFile.size < 100 * 1024) {
                            newFile = this.$refs.upload.update(newFile, {error: 'size'})
                        }
                    }
                    if (newFile.progress !== oldFile.progress) {
                        // console.log('progress', newFile.progress, newFile)
                    }
                    if (newFile.error !== oldFile.error) {
                        // console.log('error', newFile.error, newFile)
                    }
                    if (newFile.success !== oldFile.success) {
                        console.log('success', newFile.success, newFile)

                        this.$store.dispatch('getPhoto');

                        setTimeout(()=>{
                            let objDiv = document.getElementById('block_images');
                            objDiv.scrollTop = objDiv.scrollHeight;
                        },2000)

                    }
                    */

                }
                if (!newFile && oldFile) {
                    if (oldFile.success && oldFile.response.id) {

                    }
                }
                // Automatic upload
                if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {

                    if (!this.$refs.upload.active) {
                        this.$refs.upload.active = true
                    }

                }

            }

        }
    };
</script>

<style lang="scss" scoped>
    .panel-actions {
        box-sizing: border-box;
        //   border-bottom: 2px solid;
        z-index: 10;
        padding: 10px;
        -webkit-box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.3);
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        .wrap_panel {
            display: flex;
            flex-wrap: wrap;
            .item {
               display:inline-block;
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
                label{
                     cursor: pointer !important;
                }
            }

        }

    }
</style>

