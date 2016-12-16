Ext.define('Ext.ux.ImageViewField',{
        extend          : 'Ext.view.View',
        alias           : 'widget.imageviewfield',        
        store: null, //Ext.data.StoreManager.lookup('imagesStore'),
        tpl: [
    '<tpl for=".">',
    '<div align="center" style="margin-bottom: 10px;" class="thumb-wrap">',
    '<img src="{src}" height="100" width="100"/>',
    '<br/><span >{caption}</span>',
    '</div>',
    '</tpl>']
,
        itemSelector: 'div.thumb-wrap',
        emptyText: 'No images available'
    }
)


