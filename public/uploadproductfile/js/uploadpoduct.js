jQuery(document).ready(function ($) {

    $(window).load(function(){
        $('.uploadproductfile_wrap').removeClass('notvisible')
    })
    $('#ShowLink').click(function (e) {
        e.preventDefault();
        var items = $(this).parents('.uploadproductfile_wrap').find('.uploadproductfile_imgs_item.hidden');
        items.removeClass('hidden')
        $(this).remove();
    })

    $('.upload_image-link').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var img = $this.attr('href');

        var value = $this.attr('title');
        var $conteer=$this.parents('.uploadproductfile');
        var key=$this.data('key');
        // для отправки в корзину
        var formProduct = jQuery(this).parents("form.product");
        var virtuemart_product_id = formProduct.find('input[name="virtuemart_product_id[]"]').val();
        var form_id=formProduct.attr('id');
        if(typeof form_id=="undefined"){
            form_id='formProduct_'+virtuemart_product_id;
            formProduct.attr('id',form_id);
        }
        $.magnificPopup.open({
            items: {
                src: '<div class="white-popup">' +
                      '<div class="photoConteer">' +
                         '<img src="'+img+'">' +
                      '</div>' +
                      '<div class="textBlock">' +
                        '<span>'+value+'</span>' +
                        '<a ' +
                              'data-virtuemart_product_id="'+virtuemart_product_id+'" ' +
                              'data-form_id="'+form_id+'" ' +
                              'data-key="'+key+'" ' +
                              'data-value="'+value+'" ' +
                             ' class="setAttr" href="#">Выбрать</a>' +
                      '</div>' +
                    '</div>',
                type: 'inline'
            }
        });

    })
     var setAttr=function() {
         $('body').on('click','a.setAttr',function(e){
             e.preventDefault();
             var $this=$(this);
             var key=$this.data('key');
             var form_id=$this.data('form_id');
             var formProduct=$('#'+form_id);
             var virtuemart_product_id=$this.data('virtuemart_product_id');
             var value=$this.data('value');
             $('.uploadproductfile_hidden_'+virtuemart_product_id).val(value)
             Virtuemart.setproducttype(formProduct,virtuemart_product_id);
             // устанавливаем активной ссылку
             var $item=$('.uploadproductfile_imgs_item_'+key);
             $item.siblings().removeClass('active');
             $item.addClass('active');
             // закрываем окно
             $.magnificPopup.close()
         })
    }
    jQuery("body").on("updateVirtueMartProductDetail", setAttr);
    setAttr();

});