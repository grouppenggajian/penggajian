Ext.define('Penggajian.view.laporan.laporanpenilaian.LaporanPenilaianModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.laporan-laporanpenilaian-laporanpenilaian',
    stores: {
        storepenilaian: {
            extend: 'Ext.data.Store',
    
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'lapnilai/load',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
    
    
            {
                name:	'tanggal'
            },
{
                name:	'nik'
            },
{
                name:	'nama'
            },    
{
                name:	'kode_jabatan'
            },
{
                name:	'jabatan'
            },
{
                name:	'nilai'
            }
    
    
        
        
      
            ]
        },
        storeentrynilai: {
            extend: 'Ext.data.Store',
    
            //    autoLoad:true,
            proxy: {
                type: 'ajax',        
                url: Penggajian.Global.getApiUrl()+'lapnilai/loadentry',
                reader: {
                    type: 'json',
            
                    rootProperty    : 'data',
                    totalProperty   : 'record'
                }
            }
            ,
            fields: [
               
    
    
            {
                name:	'tanggal'
            },
{
                name:	'nik'
            },
{
                name:	'nama'
            },    
{
                name:	'kode_jabatan'
            },
{
                name:	'jabatan'
            },
{
                name:	'nilai'
            }
    
    
        
        
      
            ]
        }
    }

});
