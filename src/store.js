import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        page_id: page_id,
        // группы
        groups: [],
        active_ind: false,// активная группа
        show_dir: false,
        // фото и путь
        images: [],
        path: "",
        // успех сохранения
        succes: false
    },
    mutations: {
        // уставливаем значение по умолчанию
        addItemsDefault(state, data) {
            for (let index = 0; index < data.length; index++) {
                let element = data[index];
                state.groups.push(element);
            }
        },
        // добавление новой группы
        add_groups(state) {
            state.groups.push({
                title: "",
                tooltip:"",
                items: [],
                sort:state.groups.length+1
            });
        },
        // удаление группы
        removeGroup(state, data) {
            state.groups.splice(data.ind, 1);
        },
        // заголовок группы
        setTitle(state, data) {
            state.groups[data.ind].title = data.val;
        },
        // установить подсказку
        setTooltip(state, data) {
            state.groups[data.ind].tooltip = data.val;
        },

        // добавление фото в группу c менеджера файлов
        addPhotogroup(state, data) {
            state.groups[state.active_ind].items.push({
                photo: data.item,
                title: "",
                sort:state.groups[state.active_ind].items.length+1
            });
        },

        // добавление фото в группу c кнопки быстрой загрузки
        addPhotogroupFast(state, data) {
            // let ind=parseInt(data.ind)
            // console.log('data')
            // console.log(data)
            state.groups[state.active_ind].items.push({
                photo: data.item,
                title: data.title,
                sort:state.groups[state.active_ind].items.length+1
            });
        },


        // удалить фото из группы
        removePhotoinGroup(state, data) {
            state.groups[data.ind].items.splice(data.key, 1);
        },

        // установить название фото
        setPhotoTitle(state, data) {
            Vue.set(state.groups[data.ind].items[data.key], 'title', data.v)
        },
        //активная группа
        setActiveGroup(state, ind){
            console.log(ind+" ind")
            state.active_ind = ind;
        },
        // добавление элемент фото в группу
        addItem(state, ind) {
            state.active_ind = ind;
            state.show_dir = true;
        },
        //закрытия окна
        close(state) {
            state.show_dir = false;
        },
        // установка фото
        setPhoto_path_default(state, data) {
            state.images = data.images;
            state.path = data.path;
        },
        // сортировка  группы
        updateSortGroup(state,value ){
            state.groups=value;
        },
        // сортировка в группе
        updateSortItemsinGroup(state,date){
            state.groups[date.ind].items=date.value;
        }

    },
    
    actions: {
     
        //получить все значения
        getItems({commit, state}) {
            let uniq_param= (new Date()).getTime();
            Vue.axios
                .get(process.env.VUE_APP_ENV_AJAX_ITEMS + "?action=get&page_id=" + state.page_id+"&uniq_param="+uniq_param, {})
                .then(response => {
                    if (response.data) {
                        this.commit("addItemsDefault", response.data);
                    }
                });
        },

        // получаем все фото по умолчанию из папки
        getPhoto() {
            let uniq_param= (new Date()).getTime();
            Vue.axios
                .get(process.env.VUE_APP_ENV_AJAX + "?action=get_catalog&=uniq_param="+uniq_param, {

                })
                .then(response => {
                    this.commit("setPhoto_path_default", response.data);
                });
        },
     
        // удаление фотки
        removePhoto({commit, state}, data) {
            let formdata = new FormData();
            formdata.append("action", "delete");
            formdata.append("item", data.item);
            const options = {
                method: "POST",
                data: formdata,
                url: process.env.VUE_APP_ENV_AJAX
            };
            Vue.axios(options).then(response => {
                this.dispatch('getPhoto')
            });
        },

        save({commit, state}) {
            let formdata = new FormData();
            formdata.append("action", "save");
            formdata.append("page_id", state.page_id);
            formdata.append("items", JSON.stringify(state.groups));
            const options = {
                method: "POST",
                data: formdata,
                url: process.env.VUE_APP_ENV_AJAX_ITEMS
            };
            Vue.axios(options).then(response => {
                if (response.data.suc) {
                    state.succes = true;
                    setTimeout(() => {
                        state.succes = false;
                    }, 3000)
                }
            });

        }
    }
});
